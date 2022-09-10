import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive, Min, Max, IsInt, IsDecimal } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'

export class CreateProductDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Min(0)
    @Max(99999)
    readonly price: number;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    @Min(0)
    @Max(99999)
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }