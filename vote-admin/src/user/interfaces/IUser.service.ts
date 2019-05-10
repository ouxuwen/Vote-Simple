import { User } from '../user.entity';
import { IUser } from './IUser';

export interface IUserService {
    findAll(): Promise<Array<User>>;
    findById(uid: number): Promise<User | null>;
    findOption(options: Object): Promise<User[] >;
    findOne(options: Object): Promise<User | null>;
    create(user: IUser): Promise<User>;
    update(uid: number, newValue: IUser): Promise<User | null>;
    delete(uid: number): Promise<number>;
}