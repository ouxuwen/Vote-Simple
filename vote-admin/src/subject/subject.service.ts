import { Injectable, Inject } from '@nestjs/common';
import { Subject } from './subject.entity';
import { ISubject, ISubjectService } from './interfaces/index';
import { Vote } from '../vote/vote.entity';
import { List } from '../list/list.entity';

@Injectable()
export class SubjectService implements ISubjectService {
    constructor(
        @Inject('SubjectRepository') private readonly subjectRepository: typeof Subject,
        @Inject('ListRepository') private readonly listRepository: typeof List ,  
        @Inject('VoteRepository') private readonly voteRepository: typeof Vote,
        
        ) { }

    public async findAll(): Promise<Array<Subject>> {
        return await this.subjectRepository.findAll<Subject>();
    }


    public async findOP(options: Object): Promise<Array<Subject>>{
        return await this.subjectRepository.findAll<Subject>({ include: [Vote] ,...options});
    }

    //findOne()可以加入各种option，以下示范常见的where
    //注意findOne() 找到一笔就会立即return data，不会继续往下找。
    public async findOne(options: Object): Promise<Subject | null> {
        return await this.subjectRepository.findOne<Subject>(options);
    }

    //restful API很常用。
    public async findById(sid: number): Promise<Subject | null> {
        return await this.subjectRepository.findById<Subject>(sid);
    }

    public async create(subject: ISubject): Promise<Subject> {
        let count = await this.subjectRepository.count({where:{uid:subject.uid,pid:subject.pid}})
        if(count>= 3){
            return Promise.reject({"message":"Over 3 subjects !"})
        }
        let list =  await this.listRepository.findOne({where:{uid:subject.uid,pid:subject.pid}});
        let newSubject = { lid:list.dataValues.lid,...subject}
        console.log(newSubject)
        return await this.subjectRepository.create<Subject>(newSubject);
    }

    public async update(sid: number, newValue: ISubject): Promise<Subject | null> {

        //先找出单笔资料
        let subject = await this.subjectRepository.findById<Subject>(sid);

        //该笔资料不存在
        if (!subject || !subject.sid) {
            // console.error("subject doesn't exist");
            return Promise.reject("subject doesn't exist");
        }
        //覆写过的subject物件
        subject = this._assign(subject, newValue);
        //呼叫subject Model的方法
        return await subject.save({ returning: true });
    }

    public async delete(sid: number): Promise<number> {
        let res = await this.voteRepository.destroy({
            where: { sid }
        })
        //成功会回传1，失败回传0
        return await this.subjectRepository.destroy({
            where: { sid }
        })
    }

    //将新资料物件与旧资料物件做逐一属性值比对，不一样就覆写旧资料物件的值。
    private _assign(subject: ISubject, newValue: ISubject): Subject {
        //遍历旧资料属性，资料在dataValues属性裡
        for (const key of Object.keys(subject["dataValues"])) {
            //两个物件同属性不同值
            if (subject[key] !== newValue[key]) {
                //覆写旧资料物件，给予新资料物件的值
                subject[key] = newValue[key];
            }
        }
        //返回一个subject Model
        return subject as Subject;
    }

}