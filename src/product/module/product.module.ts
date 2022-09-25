import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { AuthGuard } from "@nestjs/passport";
import { AuthModule } from "src/auth/module/auth.module";
import { Role, RoleSchema } from "src/role/entity/role.entity";
import { RoleModule } from "src/role/module/role.module";
import { RoleService } from "src/role/service/role.service";
import { ProductController } from "../controller/product.controller";
import { Product, ProductSchema } from "../entity/product.entity";
import { ProductService } from "../service/product.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },
    {
      name: Role.name,
      schema: RoleSchema
    }
  ]), RoleModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, RoleService],
})
export class ProductModule { }
