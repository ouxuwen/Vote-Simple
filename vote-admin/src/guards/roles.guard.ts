import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        //  利用Reflector 定义 roles角色组 ;  知道处理程序需要处理哪些角色 不过暂时需求用不到
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log("roles:", roles)
        if (roles) {
            // 执行一些角色操作
            return false;
        }

        return true;
    }
}