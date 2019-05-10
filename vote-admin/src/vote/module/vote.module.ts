import { Module } from '@nestjs/common';
import { VoteService } from '../vote.service';
import { VoteProvider } from '../vote.provider';
import { VoteController } from './vote.controller';
import { GuardModule } from '../../guards/guard.module';
import { EmailProvider } from '../../unit/SendEmail';
import { ListProvider } from '../../list/list.provider';
@Module({
    imports: [GuardModule],
    controllers: [VoteController],
    providers: [
        VoteService,
        VoteProvider,
        EmailProvider,
        ListProvider
    ],
    exports: [
        VoteService,
        VoteProvider,

    ]
})
export class VoteModule { }