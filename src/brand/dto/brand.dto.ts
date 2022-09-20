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
    ValidateNested
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateBrandDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    readonly logo: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) { }