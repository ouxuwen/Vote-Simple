import { Module } from '@nestjs/common';
import { PhaseService } from '../phase.service';
import { PhaseProvider } from '../phase.provider';
import { PhaseController } from './phase.controller';
import { ListProvider } from '../../list/list.provider';
import { GuardModule } from '../../guards/guard.module';
import { ListService } from '../../list/list.service';
import { SubjectProvider } from '../../subject/subjet.provider';
import { VoteProvider } from '../../vote/vote.provider';
import { UserProvider } from '../../user/user.provider';

@Module({
    imports:[GuardModule],
    controllers:[PhaseController],
    providers: [
        PhaseService,
        PhaseProvider,
        ListProvider,
        ListService,
        SubjectProvider,
        VoteProvider,
        UserProvider
    ]
})
export class PhaseModule { }