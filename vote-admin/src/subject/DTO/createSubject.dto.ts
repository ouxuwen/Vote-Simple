import { ApiModelProperty } from '@nestjs/swagger';

export class CreateSubjectDTO {
    @ApiModelProperty()
    readonly sid: number;
    @ApiModelProperty()
    readonly uid: number;
    @ApiModelProperty()
    readonly pid: number;
    @ApiModelProperty()
    readonly subject: string;
    @ApiModelProperty()
    readonly introduction: string;
    @ApiModelProperty()
    readonly status: number;
    @ApiModelProperty()
    readonly create_date: number;
}