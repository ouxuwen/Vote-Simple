import { Controller, Get, Response, HttpStatus, Param, Body, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { VoteService } from '../vote.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RT } from '../../unit/resTpl';
import { TokenGuard } from '../../guards/token.guard';
//swagger服務要顯示的項目名稱
@ApiUseTags('vote')
@Controller('vote')
@UseGuards(TokenGuard)
export class VoteController {

    constructor(private readonly voteService: VoteService) { }

    @Get()
    public async getVotes(@Response() res) {
        await this.voteService.findAll().then(vote => {
            res.status(HttpStatus.OK).json(RT.success(vote));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Get('find')
    public async findVote(@Response() res) {
        //給定where條件
        let queryCondition = { where: { Name: 'Mary' } };
        const vote = await this.voteService.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(RT.success(vote));
    }

    @Get(':vid')
    public async getVote(@Response() res, @Param() param) {

        await this.voteService.findById(param.vid).then(vote => {
            res.status(HttpStatus.OK).json(RT.success(vote));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        })

    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createVote(@Response() res, @Body() createVotesDTO) {
      
        createVotesDTO['create_date'] = new Date().getTime();
        await this.voteService.create(createVotesDTO).then(vote=>{
            res.status(HttpStatus.OK).json(RT.success(RT.success(vote)));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });
         
    }

    @Patch(':vid')
    public async updateVote(@Param() param, @Response() res, @Body() body) {

        await this.voteService.update(param.vid, body).then(vote => {
            res.status(HttpStatus.OK).json(RT.success(vote));
        }).catch(err => {
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }

    @Delete(':vid')
    public async deleteVote(@Param() param, @Response() res) {

        await this.voteService.delete(param.vid).then(vote=>{
            res.status(HttpStatus.OK).json(RT.success(vote));
        }).catch(err =>{
            res.status(HttpStatus.OK).json(RT.error(null, err));
        });

    }
}