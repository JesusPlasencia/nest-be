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
import { CustomerService } from "../service/customer.service";
import { CreateCustomerDTO, UpdateCustomerDTO } from "../dto/customer.dto";

@ApiTags("customers")
@Controller("customers")
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.customerService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.customerService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateCustomerDTO) {
        return this.customerService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateCustomerDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.customerService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.customerService.delete(id);
    }
}
