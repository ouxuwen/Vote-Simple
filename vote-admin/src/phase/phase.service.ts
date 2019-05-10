import { Injectable, Inject } from '@nestjs/common';
import { Phase } from './phase.entity';
import { IPhase, IPhaseService } from './interfaces/index';
import { List } from '../list/list.entity';
import { IList } from '../list//interfaces/index';
import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { Vote } from '../vote/vote.entity';
import { SendEmail } from '../unit/SendEmail';
var dateFormat = require('dateformat');
@Injectable()
export class PhaseService implements IPhaseService {
    constructor(
        @Inject('PhaseRepository') private readonly phaseRepository: typeof Phase,
        @Inject('ListRepository') private readonly listRepository: typeof List,
        @Inject('SubjectRepository') private readonly subjectRepository: typeof Subject,
        @Inject('VoteRepository') private readonly voteRepository: typeof Vote,
    ) { }

    public async findAll(): Promise<Array<Phase>> {
        let res = await this.phaseRepository.findAll<Phase>({ include: [{ model: List, include: [{ model: User, attributes: ['username', 'group'] }, { model: Subject, include: [{ model: Vote }] }] }] });
        return res;
    }

    public async findUserList(uid): Promise<Array<Phase>> {
        let res = await this.phaseRepository.findAll<Phase>({ include: [{ model: Subject, where: { uid: uid } }] });
        return res;
    }


    //findOne()可以加入各种option，以下示范常见的where
    //注意findOne() 找到一笔就会立即return data，不会继续往下找。
    public async findOne(options: Object): Promise<Phase | null> {

        return await this.phaseRepository.findOne<Phase>(options);
    }

    //restful API很常用。
    public async findById(pid: number): Promise<Phase | null> {
        return await this.phaseRepository.findById<Phase>(pid);
    }

    public async create(phase: IPhase): Promise<Phase> {

        // this.phaseRepository.bulkCreate<Phase>([phase])
        return await this.phaseRepository.create<Phase>(phase);

    }

    public async multiCreate(phase: IPhase, lists: IList[]): Promise<any> {
        if (!lists || lists.length == 0) {
            return Promise.reject({ message: "data error" });
        }
        // this.phaseRepository.bulkCreate<Phase>([phase])
        let emailTool = new SendEmail();
        

        let res = await this.phaseRepository.create<Phase>(phase);

        lists.map((el, i) => {
            lists[i]['pid'] = res.pid;
            lists[i]['create_date'] = new Date().getTime();
        })

        let mulRes = await this.listRepository.bulkCreate<List>(lists);
        if(mulRes){
            this.listRepository.findAll({order:[['share_date']],where:{pid:res.pid},include:[{model:User,attributes:['username','email']},{model:Phase,attributes:['name']}]}).then(list=>{
                let html = `<h3>Hey guys:</h3><p>The new Share-Plan has already generated.<br>Please check it out and Get your share subjects ready at least two week before your share date. </p><h2 style="text-algin:center">${phase.name}</h2><table border=1 width='500'><thead><tr><th>ID</th><th>Name</th><th>Share Date</th></tr></thead>`;
                let emails = [];
                list.forEach((ll,index)=>{
                    let data = ll['dataValues']
                    html+=`<tr>`;
                    html+=`<td>${index+1}</td><td>${data.user.username}</td><td>${ dateFormat(data.share_date, "yyyy-mm-dd")}</td>`;
                    html+= `</tr>`;
                    if(ll.user.email){
                        emails.push(ll.user.email);
                    }
                });
                html+=`</table>`;
                emailTool.send(emails,"New Share Plan","Heys Guys",html);
               
            })
        }
        
        
        return mulRes;


    }

    public async bulkCreate(phases: IPhase[]): Promise<Phase[]> {
        // this.phaseRepository.bulkCreate<Phase>([phase])

        return await this.phaseRepository.bulkCreate<Phase>(phases);

    }

    // public async save(phase: IPhase): Promise<Phase> {
    //     return await this.phaseRepository.save<Phase>(phase);
    // }

    public async update(pid: number, newValue: IPhase): Promise<Phase | null> {

        //先找出单笔资料
        let phase = await this.phaseRepository.findById<Phase>(pid);

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
        await this.listRepository.destroy({ where: { pid } })
        await this.subjectRepository.destroy({ where: { pid } })
        await this.voteRepository.destroy({ where: { pid } })
        
        return await this.phaseRepository.destroy({
            where: { pid }
        })
    }

    //将新资料物件与旧资料物件做逐一属性值比对，不一样就覆写旧资料物件的值。
    private _assign(phase: IPhase, newValue: IPhase): Phase {
        //遍历旧资料属性，资料在dataValues属性裡
        for (const key of Object.keys(phase["dataValues"])) {
            //两个物件同属性不同值
            if (phase[key] !== newValue[key]) {
                //覆写旧资料物件，给予新资料物件的值
                phase[key] = newValue[key];
            }
        }
        //返回一个user Model
        return phase as Phase;
    }

}