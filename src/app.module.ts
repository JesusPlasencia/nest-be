import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/module/product.module";
import { CategoryModule } from "./category/module/category.module";
import { SubcategoryModule } from "./subcategory/module/subcategory.module";
import { BrandModule } from "./brand/module/brand.module";
import { CommentModule } from "./comment/module/comment.module";
import { UserModule } from "./user/module/user.module";
import { CustomerModule } from "./customer/module/customer.module";
import { OrderModule } from "./order/module/order.module";
import { ItemModule } from "./item/module/item.module";
import { RoleModule } from "./role/module/role.module";
import { SummaryModule } from "./summary/module/summary.module";
import { DatabaseModule } from "./database/module/database.module";
import { environments } from "./environment";
import { AuthModule } from './auth/module/auth.module';
import config from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || ".env",
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductModule,
    CategoryModule,
    SubcategoryModule,
    BrandModule,
    CommentModule,
    UserModule,
    CustomerModule,
    OrderModule,
    ItemModule,
    RoleModule,
    SummaryModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "TASKS",
      useFactory: async (http: HttpService) => {
        const tasks = (
          await http.axiosRef.get("https://jsonplaceholder.typicode.com/todos")
        ).data;
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule { }
