import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from './product/module/product.module';
import { CategoryModule } from './category/module/category.module';
import { SubcategoryModule } from './subcategory/module/subcategory.module';
import { BrandModule } from './brand/module/brand.module';
import { CommentModule } from './comment/module/comment.module';
import { UserModule } from './user/module/user.module';
import { CustomerModule } from './customer/module/customer.module';
import { OrderModule } from './order/module/order.module';
import { ItemModule } from './item/module/item.module';
import { RoleModule } from './role/module/role.module';

@Module({
  imports: [ProductModule, CategoryModule, SubcategoryModule, BrandModule, CommentModule, UserModule, CustomerModule, OrderModule, ItemModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
