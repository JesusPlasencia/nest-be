import {
    IsNumber,
    IsNotEmpty,
    IsMongoId
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateItemDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    readonly product: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number;
}

export class UpdateItemDTO extends PartialType(CreateItemDTO) { }