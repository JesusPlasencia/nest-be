import { Module } from '@nestjs/common';
import { SubcategoryController } from '../controller/subcategory.controller';
import { SubcategoryService } from '../service/subcategory.service';

@Module({
    controllers: [SubcategoryController],
    providers: [SubcategoryService]
})
export class SubcategoryModule { }
