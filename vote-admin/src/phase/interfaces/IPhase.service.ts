import { Phase } from '../phase.entity';
import { IPhase } from './IPhase';

export interface IPhaseService {
    findAll(): Promise<Array<Phase>>;
    findById(uid: number): Promise<Phase | null>;
    findOne(options: Object): Promise<Phase | null>;
    create(user: IPhase): Promise<Phase>;
    update(uid: number, newValue: IPhase): Promise<Phase | null>;
    delete(uid: number): Promise<number>;
}