import { Module } from '@nestjs/common';
import { ListService } from '../list.service';
import { ListProvider } from '../list.provider';
import { ListController } from './list.controller';
import { GuardModule } from '../../guards/guard.module';

@Module({
    imports:[GuardModule],
    controllers: [ListController],
    providers: [
        ListService,
        ListProvider
    ],
    exports: [
        ListService,
        ListProvider]
})
export class ListModule { }