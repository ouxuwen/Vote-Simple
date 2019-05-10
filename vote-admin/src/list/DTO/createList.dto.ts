import { ApiModelProperty } from '@nestjs/swagger';

export class CreateListDTO {
    @ApiModelProperty()
    readonly lid: number;
    @ApiModelProperty()
    readonly uid: number;
    @ApiModelProperty()
    readonly pid: number; 
    @ApiModelProperty()
    readonly share_date: number;
    @ApiModelProperty()
    readonly create_date: number;
}