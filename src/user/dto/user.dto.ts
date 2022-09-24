import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  Length,
  IsEmail
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 25)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 25)
  readonly password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly role: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }

export class EmailDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}