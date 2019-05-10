import { ApiModelProperty } from '@nestjs/swagger';

export class CreateVoteDTO {
    @ApiModelProperty()
    readonly vid: number;
    @ApiModelProperty()
    readonly pid: number;
    @ApiModelProperty()
    readonly author_id: number;
    @ApiModelProperty()
    readonly sid: number;
    @ApiModelProperty()
    readonly uid: number;
    @ApiModelProperty()
    readonly comment: string;
    @ApiModelProperty()
    readonly create_date: number;
}