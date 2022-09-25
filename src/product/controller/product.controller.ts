import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../service/product.service";
import { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { JwtAuthGuard } from './../../auth/guards/jwt-auth/jwt-auth.guard'
import { Public } from "src/auth/decorators/public/public.decorator";
import { Roles } from "src/auth/decorators/roles/roles.decorator";
import { Role } from "src/auth/model/roles.model";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) { }

  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  get(@Query() params?: FilterProductDTO) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get("/custom")
  @HttpCode(HttpStatus.OK)
  getByFilter(@Query() params?: FilterProductDTO) {
    return this.productService.findAllCustom(params);
  }

  @Public()
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getById(@Param("id", MongoIdPipe) id: string) {
    return this.productService.findById(id);
  }

  @Roles(Role.EMPLOYEE)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }

  @Roles(Role.EMPLOYEE)
  @Put("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateProductDTO,
    @Param("id", MongoIdPipe) id: string
  ) {
    return this.productService.update(id, payload);
  }

  @Roles(Role.EMPLOYEE)
  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
