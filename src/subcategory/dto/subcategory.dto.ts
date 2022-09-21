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
    ValidateIf,
    IsMongoId
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateSubcategoryDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    readonly category: string;
}

export class UpdateSubcategoryDTO extends PartialType(CreateSubcategoryDTO) { }