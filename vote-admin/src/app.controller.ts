import { Post, Controller, Body, Response, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RT } from './unit/resTpl';
// import { TokenGuard } from './guards/token.guard'
// import { AdminGuard } from './guards/admin.guard';
// import { Roles } from './guards/roles.decorator';
// import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }



  // 尝试用守卫
  // 使用useGuard作为守卫
  // @UseGuards(TokenGuard, AdminGuard)
  // 使用 根据Refect自定义的decorator作为守卫
  @Post('login')
  // @Roles('token','admin')
  // @UseGuards(RolesGuard)
  public async login(@Body() body, @Response() res) {
    if (!body.username || !body.password) {
      return res.status(HttpStatus.OK).json(RT.error(null, "Please enter the valid username | password"));
    }

    this.appService.login(body).then(data => {
      res.status(HttpStatus.OK).json(RT.success(data));
    }).catch(err => {
      res.status(HttpStatus.OK).json(RT.error(err, err));
    })

  }
}
