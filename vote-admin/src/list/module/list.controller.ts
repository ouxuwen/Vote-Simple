import { Controller, Get, Response, HttpStatus, Param, Body, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { ListService } from '../list.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RT } from '../../unit/resTpl';
import { TokenGuard } from '../../guards/token.guard'
//swagger服務要顯示的項目名稱
@ApiUseTags('list')
@Controller('list')
@UseGuards(TokenGuard)
export class ListController {

    constructor(private readonly listService: ListService) { }

    @Get()
    public async getLists(@Response() res) {
        await this.listService.findAll().then(list => {
            res.status(HttpStatus.OK).json(RT.success(list));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Get('user/:uid')
    public async findUserList(@Response() res,@Param() param) {
        //給定where條件
        const list = await this.listService.findUserList(param.uid);
        return res.status(HttpStatus.OK).json(RT.success(list));
    }

    @Get(':lid')
    public async getList(@Response() res, @Param() param) {

        await this.listService.findById(param.lid).then(list => {
            res.status(HttpStatus.OK).json(RT.success(list));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        })

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createList(@Response() res, @Body() createListsDTO) {

        createListsDTO['create_date'] = new Date().getTime();
        await this.listService.create(createListsDTO).then(list => {
            res.status(HttpStatus.OK).json(RT.success(RT.success(list)));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Patch(':lid')
    public async updateList(@Param() param, @Response() res, @Body() body) {
        await this.listService.update(param.lid, body).then(list => {
            res.status(HttpStatus.OK).json(RT.success(list));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
    }

    @Delete(':lid')
    public async deleteList(@Param() param, @Response() res) {

        await this.listService.delete(param.lid).then(list => {
            res.status(HttpStatus.OK).json(RT.success(list));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }
}