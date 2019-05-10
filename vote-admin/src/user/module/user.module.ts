import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserProvider } from '../user.provider';
import { UserController } from './user.controller';
import { ListProvider } from '../../list/list.provider';
import { SubjectProvider } from '../../subject/subjet.provider';
import { VoteProvider } from '../../vote/vote.provider';

@Module({

    controllers:[UserController],
    providers: [
        UserService,
        UserProvider,
        ListProvider,
        SubjectProvider,
        VoteProvider
    ],
    exports:[UserService,UserProvider]
})
export class UserModule { }