import { Vote } from '../vote.entity';
import { IVote } from './IVote';

export interface IVoteService {
    findAll(): Promise<Array<Vote>>;
    findById(uid: number): Promise<Vote | null>;
    findOne(options: Object): Promise<Vote | null>;
    create(vote: IVote): Promise<Vote>;
    update(uid: number, newValue: IVote): Promise<Vote | null>;
    delete(uid: number): Promise<number>;
}