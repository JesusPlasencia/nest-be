import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductController } from './product/controller/product.controller';
import { ProductModule } from './product/module/product.module';
import { ProductService } from './product/service/product.service';
import { CategoryController } from './category/controller/category.controller';
import { CategoryModule } from './category/module/category.module';
import { CategoryService } from './category/service/category.service';
import { SubcategoryController } from './subcategory/controller/subcategory.controller';
import { SubcategoryModule } from './subcategory/module/subcategory.module';
import { SubcategoryService } from './subcategory/service/subcategory.service';
import { BrandController } from './brand/controller/brand.controller';
import { BrandModule } from './brand/module/brand.module';
import { BrandService } from './brand/service/brand.service';
import { CommentController } from './comment/controller/comment.controller';
import { CommentModule } from './comment/module/comment.module';
import { CommentService } from './comment/service/comment.service';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/module/user.module';
import { UserService } from './user/service/user.service';
import { CustomerController } from './customer/controller/customer.controller';
import { CustomerModule } from './customer/module/customer.module';
import { CustomerService } from './customer/service/customer.service';
import { OrderController } from './order/controller/order.controller';
import { OrderModule } from './order/module/order.module';
import { OrderService } from './order/service/order.service';
import { ItemController } from './item/controller/item.controller';
import { ItemModule } from './item/module/item.module';
import { ItemService } from './item/service/item.service';

@Module({
  imports: [ProductModule, CategoryModule, SubcategoryModule, BrandModule, CommentModule, UserModule, CustomerModule, OrderModule, ItemModule],
  controllers: [AppController, ProductController, CategoryController, SubcategoryController, BrandController, CommentController, UserController, CustomerController, OrderController, ItemController],
  providers: [AppService, ProductService, CategoryService, SubcategoryService, BrandService, CommentService, UserService, CustomerService, OrderService, ItemService],
})
export class AppModule { }
