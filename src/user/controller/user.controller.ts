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
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { UserService } from "../service/user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get() {
    return this.userService.findAll();
  }

  @Get("/filter")
  @HttpCode(HttpStatus.OK)
  getByFilter() {
    return {
      message: `User filtered.`,
    };
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Get("/:id/orders")
  @HttpCode(HttpStatus.OK)
  getOrdersById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOrdersById(id);
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
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.userService.update(id, payload);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
