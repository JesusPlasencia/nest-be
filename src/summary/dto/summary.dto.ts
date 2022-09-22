import {
    IsNumber,
    IsNotEmpty,
    Min,
    Max,
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateSummaryDTO {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    subtotal: number;

}

export class UpdateSummaryDTO extends PartialType(CreateSummaryDTO) { }