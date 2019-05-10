import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module/user.module'
import { SubjectModule } from './subject/module/subject.module';
import { VoteModule } from './vote/module/vote.module';
import { PhaseModule } from './phase/module/phase.module';
import { ListModule } from './list/module/list.module';
import { DatabaseModule } from './db/database.module';
import { GuardModule } from './guards/guard.module';
import { UnitModule } from './unit/Unit.module';
import { ScheduleService } from './unit/ScheduleService';
@Module({
  imports: [GuardModule, UserModule, SubjectModule, VoteModule, PhaseModule, ListModule, DatabaseModule, UnitModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  constructor(private scService: ScheduleService) {
     scService.start('30 1 1 * * *');
  }
}
