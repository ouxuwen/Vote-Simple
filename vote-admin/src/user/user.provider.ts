import { User } from './user.entity';

export const UserProvider = {
    provide: 'UserRepository',
    useValue: User
}