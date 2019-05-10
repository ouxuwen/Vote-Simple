import { Subject } from '../subject.entity';
import { ISubject } from './ISubject';

export interface ISubjectService {
    findAll(): Promise<Array<Subject>>;
    findById(uid: number): Promise<Subject | null>;
    findOne(options: Object): Promise<Subject | null>;
    create(user: ISubject): Promise<Subject>;
    update(uid: number, newValue: ISubject): Promise<Subject | null>;
    delete(uid: number): Promise<number>;
}