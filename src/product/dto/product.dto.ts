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
  ValidateNested,
  IsMongoId
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";
//import { CreateSubcategoryDTO } from "src/subcategory/dto/subcategory.dto";


export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(99999)
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(99999)
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @ValidateNested()
  // readonly subcategory: CreateSubcategoryDTO;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly subcategory: string;

  @ApiProperty()
  @IsMongoId()
  readonly brand: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }

export class FilterProductDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf(param => param.minPrice)
  @IsPositive()
  maxPrice: number;
}