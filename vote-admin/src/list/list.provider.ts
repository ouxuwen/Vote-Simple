import { List } from './list.entity';

export const ListProvider = {
    provide: 'ListRepository',
    useValue: List
}