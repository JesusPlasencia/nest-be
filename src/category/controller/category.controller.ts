import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { CategoryService } from "../service/category.service";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../dto/category.dto";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  get() {
    return this.categoryService.findAll();
  }

  @Get("/custom")
  @HttpCode(HttpStatus.OK)
  getByFilter() {
    return this.categoryService.findAllCustom();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getById(@Param("id", MongoIdPipe) id: string) {
    return this.categoryService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoryService.create(payload);
  }

  @Put("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() payload: UpdateCategoryDTO,
    @Param("id", MongoIdPipe) id: string
  ) {
    return this.categoryService.update(id, payload);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", MongoIdPipe) id: string) {
    return this.categoryService.delete(id);
  }
}
