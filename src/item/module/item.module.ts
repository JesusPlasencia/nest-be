import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ItemController } from "../controller/item.controller";
import { Item, ItemSchema } from "../entity/item.entity";
import { ItemService } from "../service/item.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Item.name,
      schema: ItemSchema
    }
  ])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
