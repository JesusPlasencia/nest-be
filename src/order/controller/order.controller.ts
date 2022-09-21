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
    Query,
} from "@nestjs/common";
import { MongoIdPipe } from "src/common/mongo-id/mongo-id.pipe";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "../service/order.service";
import { CreateOrderDTO, UpdateOrderDTO, AddProductsToOrderDTO } from "../dto/order.dto";

@ApiTags("orders")
@Controller("orders")
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.orderService.findAll();
    }

    @Get("/custom")
    @HttpCode(HttpStatus.OK)
    getByFilter() {
        return this.orderService.findAllCustom();
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

    @Put("/:id/products")
    @HttpCode(HttpStatus.ACCEPTED)
    updateProducts(
        @Body() payload: AddProductsToOrderDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.orderService.addProduct(id, payload.productIds);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.orderService.delete(id);
    }

    @Delete("/:id/product/:productId")
    @HttpCode(HttpStatus.OK)
    removeProduct(@Param("id", MongoIdPipe) id: string, @Param("productId", MongoIdPipe) productId: string) {
        return this.orderService.removeProduct(id, productId);
    }
}
