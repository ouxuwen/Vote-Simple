import { Injectable, Inject } from '@nestjs/common';
import { Vote } from './vote.entity';
import { IVote, IVoteService } from './interfaces/index';
import { User } from '../user/user.entity';
import { SendEmail } from '../unit/SendEmail';
import { List } from '../list/list.entity';
@Injectable()
export class VoteService implements IVoteService {
    constructor(
        @Inject('VoteRepository') private readonly voteRepository: typeof Vote,
        @Inject('ListRepository') private readonly listRepository: typeof List,
        @Inject('UserRepository') private readonly userRepository: typeof User,
    ) { }

    public async findAll(): Promise<Array<Vote>> {

        return await this.voteRepository.findAll<Vote>({include:[User]});

    }

    //findOne()可以加入各种option，以下示范常见的where
    //注意findOne() 找到一笔就会立即return data，不会继续往下找。
    public async findOne(options: Object): Promise<Vote | null> {
        return await this.voteRepository.findOne<Vote>(options);
    }

    //restful API很常用。
    public async findById(vid: number): Promise<Vote | null> {
        return await this.voteRepository.findById<Vote>(vid);
    }

    public async create(vote: IVote): Promise<Vote> {
        let list = await this.listRepository.findOne({where:{uid:vote.author_id,pid:vote.pid}});
        let now = new Date().getTime() ;
        if(list['dataValues'].share_date - now < 60*60*1000*24*5 && list['dataValues'].share_date - now>0){
            return Promise.reject("You can't vote for less than five days.");
        }

        let res = await this.voteRepository.findOne({ where: { uid: vote.uid, author_id: vote.author_id, pid: vote.pid } });
     
        if(vote.comment){
            
            let sub =await this.userRepository.findAll({where:{uid:{$in:[vote.author_id,vote.uid]}},attributes:['email','username','uid']});
            let author,user;
            sub.forEach(su =>{
                console.log( su.dataValues)
                if(su.dataValues.uid == vote.author_id){
                    author = su.dataValues
                }
                if(su.dataValues.uid == vote.uid){
                    user = su.dataValues
                }
            })
            let emailProvider = new SendEmail()
            emailProvider.commentNotice(user,author,vote['subject'],vote.comment)
        }
        if (res) {
            return await this.update(res.dataValues.vid, vote);
        }
        return await this.voteRepository.create<Vote>(vote);
    }

    public async update(vid: number, newValue: IVote): Promise<Vote | null> {

        //先找出单笔资料
        let vote = await this.voteRepository.findById<Vote>(vid);

        //该笔资料不存在
        if (!vote || !vote.vid) {
            // console.error("vote doesn't exist");
            return Promise.reject("vote doesn't exist");
        }
        //覆写过的user物件
        vote = this._assign(vote, newValue);
        //呼叫user Model的方法
        return await vote.save({ returning: true });
    }

    public async delete(vid: number): Promise<number> {
        //成功会回传1，失败回传0
        return await this.voteRepository.destroy({
            where: { vid }
        })
    }

    //将新资料物件与旧资料物件做逐一属性值比对，不一样就覆写旧资料物件的值。
    private _assign(vote: IVote, newValue: IVote): Vote {
        //遍历旧资料属性，资料在dataValues属性裡
        for (const key of Object.keys(vote["dataValues"])) {
            //两个物件同属性不同值
            if (vote[key] !== newValue[key]) {
                //覆写旧资料物件，给予新资料物件的值
                vote[key] = newValue[key];
            }
        }
        //返回一个user Model
        return vote as Vote;
    }

}