import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerController } from "../controller/customer.controller";
import { Customer, CustomerSchema } from "../entity/customer.entity";
import { CustomerService } from "../service/customer.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema
    }
  ])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
