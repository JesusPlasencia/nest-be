import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { ProductController } from "../controller/product.controller";
import { Product, ProductSchema } from "../entity/product.entity";
import { ProductService } from "../service/product.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
