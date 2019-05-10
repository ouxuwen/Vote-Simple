import { Controller, Get, Response, HttpStatus, Param, Body, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { PhaseService } from '../phase.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RT } from '../../unit/resTpl';
import { TokenGuard } from '../../guards/token.guard';
import { ListService } from '../../list/list.service';
//swagger服務要顯示的項目名稱
@ApiUseTags('phase')
@Controller('phase')
@UseGuards(TokenGuard)
export class PhaseController {

    constructor(private readonly phaseService: PhaseService, private readonly listService: ListService) { }

    @Get()
    public async getPhases(@Response() res) {
        await this.phaseService.findAll().then(async phase => {
            res.status(HttpStatus.OK).json(RT.success(phase));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }


    @Get('find')
    public async findPhase(@Response() res) {
        //給定where條件
        let queryCondition = { where: { Name: 'Mary' } };
        const phase = await this.phaseService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(RT.success(phase));
    }

    @Get('user/:uid')
    public async findUserPhase(@Response() res, @Param() param) {
        await this.phaseService.findUserList(param.uid).then(async phase => {
            res.status(HttpStatus.OK).json(RT.success(phase));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
    }

    @Get(':pid')
    public async getPhase(@Response() res, @Param() param) {

        await this.phaseService.findById(param.pid).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(phase));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        })

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createPhase(@Response() res, @Body() createPhasesDTO) {

        createPhasesDTO['create_date'] = new Date().getTime();
        await this.phaseService.create(createPhasesDTO).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(RT.success(phase)));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Post('bulkCreate')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async bulkCreatePhase(@Response() res, @Body() createPhasesDTO) {

        console.log("phases:", createPhasesDTO)
        await this.phaseService.bulkCreate(createPhasesDTO.data).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(RT.success(phase)));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Post('multiCreate')
    public async multiCreate(@Response() res, @Body() createPhasesDTO) {

        console.log("phases:", createPhasesDTO)
        createPhasesDTO.phase['create_date'] = new Date().getTime();
        await this.phaseService.multiCreate(createPhasesDTO.phase, createPhasesDTO.lists).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(RT.success(phase)));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Patch(':pid')
    public async updatePhase(@Param() param, @Response() res, @Body() body) {
        await this.phaseService.update(param.pid, body).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(phase));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
    }

    @Delete(':pid')
    public async deletePhase(@Param() param, @Response() res) {

        await this.phaseService.delete(param.pid).then(phase => {
            res.status(HttpStatus.OK).json(RT.success(phase));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }
}