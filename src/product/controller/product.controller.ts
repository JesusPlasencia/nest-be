import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('products')
export class ProductController {

    @Get()
    @HttpCode(200)
    get(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return {
            message: `products with limit: ${limit}, offset: ${offset} and brand: ${brand}.`
        }
    }

    @Get('/filter')
    @HttpCode(200)
    getByFilter() {
        return {
            message: `Product filtered.`
        }
    }

    @Get('/:id')
    @HttpCode(200)
    getById(@Param('id') id: any) {
        return {
            message: `Product with id: ${id}`
        }
    }

    @Post()
    @HttpCode(201)
    create(@Body() payload: any) {
        return {
            message: "Created -> Product with id: 1001.",
            payload,
        }
    }

    @Put('/:id')
    @HttpCode(200)
    update(@Body() payload: any, @Param('id') id: number) {
        return {
            message: `Updated -> Product with id: ${id}.`,
            payload,
        }
    }

    @Delete('/:id')
    @HttpCode(200)
    remove(@Param('id') id: number) {
        return {
            message: `Deleted -> Product with id: ${id}.`,
        }
    }
}
