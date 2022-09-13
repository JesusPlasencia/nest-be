import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {

    @Get('/:id/products/:productId')
    getCategory(@Param('id') id: any, @Param('productId') productId: string) {
        return `Product with id: ${productId} with Category Id: ${id}`;
    }
}
