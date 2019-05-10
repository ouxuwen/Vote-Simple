import { List } from '../list.entity';
import { IList } from './IList';

export interface IListService {
    findAll(): Promise<Array<List>>;
    findById(lid: number): Promise<List | null>;
    findOne(options: Object): Promise<List | null>;
    create(list: IList): Promise<List>;
    update(lid: number, newValue: IList): Promise<List | null>;
    delete(lid: number): Promise<number>;
}