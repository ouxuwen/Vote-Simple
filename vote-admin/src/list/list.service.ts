import { Injectable, Inject } from '@nestjs/common';
import { List } from './list.entity';
import { IList, IListService } from './interfaces/index';
import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { Phase } from '../phase/phase.entity';
import { Vote } from '../vote/vote.entity';

@Injectable()
export class ListService implements IListService {
    constructor(
        @Inject('ListRepository') private readonly listRepository: typeof List) { }

    public async findAll(options: Object = { include: [{ model: User, attributes: ['username', 'group'] }] }): Promise<Array<List>> {
        return await this.listRepository.findAll<List>(options);
    }

    public async findUserList(uid): Promise<Array<List>> {

        return await this.listRepository.findAll<List>({ include: [{model:Phase},{ model: Subject, include: [{ model: Vote ,include:[{model:User,as:'user',attributes:['username']}] }] }], where: { uid: uid }});
    }


    //findOne()可以加入各种option，以下示范常见的where
    //注意findOne() 找到一笔就会立即return data，不会继续往下找。
    public async findOne(options: Object): Promise<List | null> {

        return await this.listRepository.findOne<List>(options);
    }

    //restful API很常用。
    public async findById(pid: number): Promise<List | null> {
        return await this.listRepository.findById<List>(pid);
    }

    public async create(phase: IList): Promise<List> {
        return await this.listRepository.create<List>(phase);
    }


    public async bulkCreate(lists: IList[]): Promise<List[]> {
        // this.phaseRepository.bulkCreate<Phase>([phase])
        return await this.listRepository.bulkCreate<List>(lists);

    }
    public async update(pid: number, newValue: IList): Promise<List | null> {

        //先找出单笔资料
        let phase = await this.listRepository.findById<List>(pid);

        //该笔资料不存在
        if (!phase || !phase.pid) {
            // console.error("phase doesn't exist");
            return Promise.reject("phase doesn't exist");
        }
        //覆写过的user物件
        phase = this._assign(phase, newValue);
        //呼叫user Model的方法
        return await phase.save({ returning: true });
    }

    public async delete(pid: number): Promise<number> {
        //成功会回传1，失败回传0
        return await this.listRepository.destroy({
            where: { pid }
        })
    }

    //将新资料物件与旧资料物件做逐一属性值比对，不一样就覆写旧资料物件的值。
    private _assign(phase: IList, newValue: IList): List {
        //遍历旧资料属性，资料在dataValues属性裡
        for (const key of Object.keys(phase["dataValues"])) {
            //两个物件同属性不同值
            if (phase[key] !== newValue[key] ) {
                //覆写旧资料物件，给予新资料物件的值
                phase[key] = newValue[key];
            }
        }
        //返回一个user Model
        return phase as List;
    }

}