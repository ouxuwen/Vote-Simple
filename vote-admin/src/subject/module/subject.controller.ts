import { Controller, Get, Response, HttpStatus, Param, Body, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { SubjectService } from '../subject.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RT } from '../../unit/resTpl';
import { TokenGuard } from '../../guards/token.guard';
//swagger服務要顯示的項目名稱
@ApiUseTags('subject')
@Controller('subject')
@UseGuards(TokenGuard)
export class SubjectController {

    constructor(private readonly subjectService: SubjectService) { }

    @Get()
    public async getSubjects(@Response() res) {
        await this.subjectService.findAll().then(subject => {
            res.status(HttpStatus.OK).json(RT.success(subject));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Post('find')
    public async findSubject(@Response() res, @Body() body) {
        //給定where條件
        let queryCondition = { where: body };
        const subject = await this.subjectService.findOP(queryCondition);
        return res.status(HttpStatus.OK).json(RT.success(subject));
    }

    @Get(':sid')
    public async getSubject(@Response() res, @Param() param) {

        await this.subjectService.findById(param.sid).then(subject => {
            res.status(HttpStatus.OK).json(RT.success(subject));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        })

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createSubject(@Response() res, @Body() createSubjectsDTO) {
      
        createSubjectsDTO['create_date'] = new Date().getTime();
        await this.subjectService.create(createSubjectsDTO).then(subject=>{
            res.status(HttpStatus.OK).json(RT.success(RT.success(subject)));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
         
    }

    @Patch(':sid')
    public async updateSubject(@Param() param, @Response() res, @Body() body) {

        await this.subjectService.update(param.sid, body).then(subject => {
            res.status(HttpStatus.OK).json(RT.success(subject));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Delete(':sid')
    public async deleteSubject(@Param() param, @Response() res) {

        await this.subjectService.delete(param.sid).then(subject=>{
            res.status(HttpStatus.OK).json(RT.success(subject));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }
}