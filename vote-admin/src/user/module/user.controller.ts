import { Controller, Get, Response, HttpStatus, Param, Body, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RT } from '../../unit/resTpl';
import { TokenGuard } from '../../guards/token.guard'
import { AdminGuard } from '../../guards/admin.guard';
//swagger服務要顯示的項目名稱
@ApiUseTags('user')
@Controller('user')
@UseGuards(TokenGuard, AdminGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    public async getUsers(@Response() res) {
        await this.userService.findAll().then(user => {
            res.status(HttpStatus.OK).json(RT.success(user));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
    }

    @Get('find')
    public async findUser(@Response() res) {
        //給定where條件
        let queryCondition = { where: { type: 0 },  attributes: [ 'uid','username','group','type','email','password','create_date'] };
        const user = await this.userService.findOption(queryCondition);
        return res.status(HttpStatus.OK).json(RT.success(user));
    }

    @Get(':uid')
    public async getUser(@Response() res, @Param() param) {

        await this.userService.findById(param.uid).then(user => {
            res.status(HttpStatus.OK).json(RT.success(user));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        })

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createUser(@Response() res, @Body() createUsersDTO) {
      
        createUsersDTO['create_date'] = new Date().getTime();
        await this.userService.create(createUsersDTO).then(user=>{
            res.status(HttpStatus.OK).json(RT.success(RT.success(user)));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
         
    }

    @Patch('psd/:uid')
    public async updatePasswrod(@Param() param, @Response() res, @Body() body) {
        let result = await this.userService.findOne({where:{uid:param.uid,password:body.password}});
        if(!result){
            return    res.status(HttpStatus.OK).json(RT.error(null, "Password error"));
        }
         body = {...result['dataValues'],password:body.newPassword}
        await this.userService.update(param.uid, body).then(user => {
            res.status(HttpStatus.OK).json(RT.success(user));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Patch(':uid')
    public async updateUser(@Param() param, @Response() res, @Body() body) {

        await this.userService.update(param.uid, body).then(user => {
            res.status(HttpStatus.OK).json(RT.success(user));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Delete(':uid')
    public async deleteUser(@Param() param, @Response() res) {

        await this.userService.delete(param.uid).then(user=>{
            res.status(HttpStatus.OK).json(RT.success(user));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }
}