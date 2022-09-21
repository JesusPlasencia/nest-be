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
    readonly products: string[];
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) { }

export class AddProductsToOrderDTO {
    @IsArray()
    @IsNotEmpty()
    readonly productIds: string[];
}