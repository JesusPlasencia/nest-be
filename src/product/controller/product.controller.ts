import {
    Controller,
    Get,
    Query,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
    HttpCode,
    ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from "../service/product.service";
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.productService.findAll();
    }

    @Get('/filter')
    @HttpCode(HttpStatus.OK)
    getByFilter() {
        return {
            message: `Product filtered.`
        }
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateProductDTO) {
        return this.productService.create(payload);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    update(@Body() payload: UpdateProductDTO, @Param('id', ParseIntPipe) id: number) {
        return this.productService.update(id, payload);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }
}
