import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject('UserService') private readonly userService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log("request body :", request.body)
        console.log("request headers :", request.headers)
        let token = request.headers.token;
        let path = request.path;
        if(path.indexOf('psd')>-1){
            return true;
        }
        if (!token) {
            return false;
        } else {
            return this.validToken(token)
        }


    }

    async validToken(token: string): Promise<boolean> {
        let res = await this.userService.findOne({
            where: {
                token
            }
        })
        if (res && res['dataValues']['type'] == 1) {
            return true;
        } else {
            return false;
        }

    }
}

