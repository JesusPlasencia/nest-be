import { Module } from "@nestjs/common";
import { SubcategoryController } from "../controller/subcategory.controller";
import { SubcategoryService } from "../service/subcategory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Subcategory, SubcategorySchema } from "../entity/subcategory.entity";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Subcategory.name,
      schema: SubcategorySchema
    }
  ])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule { }
