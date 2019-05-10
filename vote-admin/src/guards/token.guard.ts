import { Injectable, CanActivate, ExecutionContext, Inject ,HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(@Inject('UserService') private readonly userService) { }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log("request body :", request.body)
        console.log("request headers :", request.headers)
        let token = request.headers.token;
        if (!token) {
            throw new HttpException("Token invalid",401)
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
        if (res) {
            return true;
        } else {
            throw new HttpException("Token invalid",401)
        }

    }
}

