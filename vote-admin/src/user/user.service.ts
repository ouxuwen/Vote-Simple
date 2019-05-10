import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { IUser, IUserService } from './interfaces/index';
import { List } from '../list/list.entity';
import { Subject } from '../subject/subject.entity';
import { Vote } from '../vote/vote.entity';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('ListRepository') private readonly listRepository: typeof List,
        @Inject('SubjectRepository') private readonly subjectRepository: typeof Subject,
        @Inject('VoteRepository') private readonly voteRepository: typeof Vote,
        ) { }

    public async findAll(): Promise<Array<User>> {
        return await this.userRepository.findAll<User>();
    }

    public async findAllList(): Promise<Array<User>> {
        return await this.userRepository.findAll<User>({ include: [List] });
    }
    
    public async findOne(options: Object): Promise<User | null> {
        return await this.userRepository.findOne<User>(options);
    }

    //findAll()可以加入各种option，以下示范常见的where
    public async findOption(options: Object): Promise<Array<User>> {
        return await this.userRepository.findAll<User>(options);
    }

    //restful API很常用。
    public async findById(uid: number): Promise<User | null> {
        return await this.userRepository.findById<User>(uid);
    }

    public async create(user: IUser): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    public async update(uid: number, newValue: IUser): Promise<User | null> {

        //先找出单笔资料
        let user = await this.userRepository.findById<User>(uid);

        //该笔资料不存在
        if (!user || !user.uid) {
            // console.error("user doesn't exist");
            return Promise.reject({ message: "user doesn't exist" });
        }
        //覆写过的user物件
        user = this._assign(user, newValue);
        //呼叫user Model的方法
        return await user.save({ returning: true });
    }

    public async delete(uid: number): Promise<number> {
        await this.listRepository.destroy({where: { uid }});
        await this.subjectRepository.destroy({where: { uid }});
        await this.voteRepository.destroy({where: {author_id: uid }});
        //成功会回传1，失败回传0
        return await this.userRepository.destroy({
            where: { uid }
        })
    }

    //将新资料物件与旧资料物件做逐一属性值比对，不一样就覆写旧资料物件的值。
    private _assign(user: IUser, newValue: IUser): User {
        //遍历旧资料属性，资料在dataValues属性裡
        for (const key of Object.keys(user["dataValues"])) {
            //两个物件同属性不同值
            if (user[key] !== newValue[key]) {
                //覆写旧资料物件，给予新资料物件的值
                user[key] = newValue[key];
            }
        }
        //返回一个user Model
        return user as User;
    }

}