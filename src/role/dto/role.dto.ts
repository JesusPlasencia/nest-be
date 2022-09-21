import {
    IsString,
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

export class CreateRoleDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) { }