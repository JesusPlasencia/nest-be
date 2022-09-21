import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "../controller/role.controller";
import { Role, RoleSchema } from "../entity/role.entity";
import { RoleService } from "../service/role.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Role.name,
      schema: RoleSchema
    }
  ])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
