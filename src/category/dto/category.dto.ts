import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    Min,
    Max,
    IsInt,
    IsOptional,
    ValidateIf
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) { }