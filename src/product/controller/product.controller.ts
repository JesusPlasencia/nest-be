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
} from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../service/product.service";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  get() {
    return this.productService.findAll();
  }

  @Get("/custom")
  @HttpCode(HttpStatus.OK)
  getByFilter() {
    return this.productService.findAllCustom();
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
