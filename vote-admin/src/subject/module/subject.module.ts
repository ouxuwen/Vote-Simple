import { Module } from '@nestjs/common';
import { SubjectService } from '../subject.service';
import { SubjectProvider } from '../subjet.provider';
import { GuardModule } from '../../guards/guard.module';
import { SubjectController } from './subject.controller';
import { ListModule } from '../../list/module/list.module';
import { VoteModule } from '../../vote/module/vote.module';
@Module({
    imports:[GuardModule,ListModule,VoteModule],
    controllers:[SubjectController],
    providers: [
        SubjectService,
        SubjectProvider
    ]
})
export class SubjectModule { }