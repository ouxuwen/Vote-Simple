import { Subject } from './subject.entity';

export const SubjectProvider = {
    provide: 'SubjectRepository',
    useValue: Subject
}