import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpStatus,
    HttpCode,
    UseGuards,
    Req
} from "@nestjs/common";
import { Request } from 'express';
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "../service/order.service";
import { CreateOrderDTO, UpdateOrderDTO } from "../dto/order.dto";
import { JwtAuthGuard } from './../../auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from "src/auth/decorators/roles/roles.decorator";
import { Role } from "src/auth/model/roles.model";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { PayloadToken } from "src/auth/model/token.model";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("orders")
@Controller("orders")
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Roles(Role.CUSTOMER)
    @Get()
    @HttpCode(HttpStatus.OK)
    get(@Req() req: Request) {
        const user = req.user as PayloadToken;
        return this.orderService.findAll(user.sub.toString());
    }

    @Get("/custom")
    @HttpCode(HttpStatus.OK)
    getByFilter(@Req() req: Request) {
        const user = req.user as PayloadToken;
        return this.orderService.findAllCustom(user.sub.toString());
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.orderService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateOrderDTO) {
        return this.orderService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateOrderDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.orderService.update(id, payload);
    }

    // @Put("/:id/products")
    // @HttpCode(HttpStatus.ACCEPTED)
    // updateProducts(
    //     @Body() payload: AddItemsToOrderDTO,
    //     @Param("id", MongoIdPipe) id: string
    // ) {
    //     return this.orderService.addItem(id, payload.itemIds);
    // }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.orderService.delete(id);
    }

    // @Delete("/:id/item/:productId")
    // @HttpCode(HttpStatus.OK)
    // removeItem(
    //     @Param("id", MongoIdPipe) id: string,
    //     @Param("productId", MongoIdPipe) itemId: string) {
    //     return this.orderService.removeItem(id, itemId);
    // }
}
