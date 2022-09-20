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
} from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../service/product.service";
import { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../dto/product.dto";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  get(@Query() params?: FilterProductDTO) {
    return this.productService.findAll(params);
  }

  @Get("/custom")
  @HttpCode(HttpStatus.OK)
  getByFilter(@Query() params?: FilterProductDTO) {
    return this.productService.findAllCustom(params);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getById(@Param("id", MongoIdPipe) id: string) {
    return this.productService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }

  @Put("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateProductDTO,
    @Param("id", MongoIdPipe) id: string
  ) {
    return this.productService.update(id, payload);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
