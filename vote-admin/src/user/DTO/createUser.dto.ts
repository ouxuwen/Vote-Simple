import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiModelProperty()
    readonly uid: number;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly type: number;
    @ApiModelProperty()
    readonly email: string;
    @ApiModelProperty()
    readonly group: string;
    @ApiModelProperty()
    readonly token: string;
    @ApiModelProperty()
    readonly create_date: number;
}