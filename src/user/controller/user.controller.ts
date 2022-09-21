import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { UserService } from "../service/user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  get() {
    return this.userService.findAll();
  }

  @Get("/custom")
  @HttpCode(HttpStatus.OK)
  getByFilter() {
    return this.userService.findAllCustom();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getById(@Param("id", MongoIdPipe) id: string) {
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @Put("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateUserDTO,
    @Param("id", ParseIntPipe) id: string
  ) {
    return this.userService.update(id, payload);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }
}
