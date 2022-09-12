import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @Length(8, 25)
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 25)
    readonly password: string;

}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }