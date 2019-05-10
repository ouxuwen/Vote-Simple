import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePhaseDTO {
    @ApiModelProperty()
    readonly pid: number;
    @ApiModelProperty()
    readonly string: string;
    @ApiModelProperty()
    readonly create_date: number;
}