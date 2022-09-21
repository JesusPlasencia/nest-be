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
import { SubcategoryService } from "../service/subcategory.service";
import { CreateSubcategoryDTO, UpdateSubcategoryDTO } from "../dto/subcategory.dto";

@ApiTags("subcategories")
@Controller("subcategories")
export class SubcategoryController {
    constructor(private subcategoryService: SubcategoryService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.subcategoryService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.subcategoryService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateSubcategoryDTO) {
        return this.subcategoryService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateSubcategoryDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.subcategoryService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.subcategoryService.delete(id);
    }
}
