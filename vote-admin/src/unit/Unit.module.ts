import { Module } from '@nestjs/common';
import { ListProvider } from '../list/list.provider';
import { ScheduleService } from './ScheduleService';

@Module({
    
    controllers:[],
    providers: [
        ListProvider,
        ScheduleService
    ],
    exports:[ScheduleService]
})
export class UnitModule { }