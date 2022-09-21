import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrandController } from "../controller/brand.controller";
import { Brand, BrandSchema } from "../entity/brand.entity";
import { BrandService } from "../service/brand.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Brand.name,
      schema: BrandSchema
    }
  ])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule { }
