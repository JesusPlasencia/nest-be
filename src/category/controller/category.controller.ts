import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoryController {

    @Get('/:id/products/:productId')
    getCategory(@Param('id') id: any, @Param('productId') productId: string) {
        return `Product with id: ${productId} with Category Id: ${id}`;
    }
}
