import {
    IsString,
    IsNotEmpty,
    Length,
    IsMongoId
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    readonly dni: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) { }