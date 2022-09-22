import {
    IsString,
    IsNotEmpty,
    IsMongoId,
    IsDate,
    IsArray
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateOrderDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    readonly user: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly delivery: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    readonly items: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    readonly summary: string;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) { }

export class AddItemsToOrderDTO {
    @IsArray()
    @IsNotEmpty()
    readonly itemIds: string[];
}