import { Injectable, Inject } from '@nestjs/common';
const md5 = require('md5')
@Injectable()
export class AppService {
  constructor(@Inject('UserService') private readonly userService) { }

  public async login(body): Promise<any> {
    let res = await this.userService.findOne({
      where: {
        username: body.username,
        password: body.password
      }
    })

    if (res) {
      // 生成token
      let token = md5(res['type'] + new Date().getTime() + 'gentingHK');
      let obj = Object.assign(res.dataValues, { token, 'create_date': new Date().getTime() });
      // 更新登录信息
      let updateRes = await this.userService.update(obj['uid'], obj);
      delete obj['password'];
      if (updateRes) {
        return Promise.resolve(obj);
      } else {
        return Promise.reject("Login failed !");
      }
    } else {
      return Promise.reject('Username or password error!')
    }

  }
}
