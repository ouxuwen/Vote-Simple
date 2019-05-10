import { Module } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { UserModule } from '../user/module/user.module';
import { AdminGuard } from './admin.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [UserModule],
    providers: [TokenGuard, AdminGuard, RolesGuard],
    exports: [TokenGuard, AdminGuard, RolesGuard]
})
export class GuardModule { }