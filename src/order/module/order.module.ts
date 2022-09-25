import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Item, ItemSchema } from "src/item/entity/item.entity";
import { Role, RoleSchema } from "src/role/entity/role.entity";
import { RoleService } from "src/role/service/role.service";
import { Summary, SummarySchema } from "src/summary/entity/summary.entity";
import { SummaryService } from "src/summary/service/summary.service";
import { OrderController } from "../controller/order.controller";
import { Order, OrderSchema } from "../entity/order.entity";
import { OrderService } from "../service/order.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema
    },
    {
      name: Item.name,
      schema: ItemSchema
    },
    {
      name: Summary.name,
      schema: SummarySchema
    },
    {
      name: Role.name,
      schema: RoleSchema
    }
  ])],
  controllers: [OrderController],
  providers: [OrderService, SummaryService, RoleService],
})
export class OrderModule { }
