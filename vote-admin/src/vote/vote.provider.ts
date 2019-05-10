import { Vote } from './vote.entity';

export const VoteProvider = {
    provide: 'VoteRepository',
    useValue: Vote
}