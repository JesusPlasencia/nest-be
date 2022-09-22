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
    readonly subtotal: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(100)
    readonly discount: number;
}

export class UpdateSummaryDTO extends PartialType(CreateSummaryDTO) { }