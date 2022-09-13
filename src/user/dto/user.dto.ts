import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 25)
    readonly username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 25)
    readonly password: string;

}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }