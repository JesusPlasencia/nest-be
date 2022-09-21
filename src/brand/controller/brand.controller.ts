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
import { BrandService } from "../service/brand.service";
import { CreateBrandDTO, UpdateBrandDTO } from "../dto/brand.dto";

@ApiTags("brands")
@Controller("brands")
export class BrandController {
    constructor(private brandService: BrandService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.brandService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.brandService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateBrandDTO) {
        return this.brandService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateBrandDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.brandService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.brandService.delete(id);
    }
}
