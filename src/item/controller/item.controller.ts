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
import { ItemService } from "../service/item.service";
import { CreateItemDTO, UpdateItemDTO } from "../dto/item.dto";

@ApiTags("items")
@Controller("items")
export class ItemController {
    constructor(private itemService: ItemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.itemService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.itemService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateItemDTO) {
        return this.itemService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateItemDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.itemService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.itemService.delete(id);
    }
}
