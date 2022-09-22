import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/product/entity/product.entity";
import { ItemController } from "../controller/item.controller";
import { Item, ItemSchema } from "../entity/item.entity";
import { ItemService } from "../service/item.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Item.name,
      schema: ItemSchema
    },
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
