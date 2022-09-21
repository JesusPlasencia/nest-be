import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
    HttpCode
} from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "../service/role.service";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/role.dto";

@ApiTags("roles")
@Controller("roles")
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.roleService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.roleService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateRoleDTO) {
        return this.roleService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateRoleDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.roleService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.roleService.delete(id);
    }

}
