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

export class CreateSubcategoryDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateSubcategoryDTO extends PartialType(CreateSubcategoryDTO) { }