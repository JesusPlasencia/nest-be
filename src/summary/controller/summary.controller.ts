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
import { SummaryService } from "../service/summary.service";
import { CreateSummaryDTO, UpdateSummaryDTO } from "../dto/summary.dto";

@ApiTags("summaries")
@Controller("summaries")
export class SummaryController {
    constructor(private summaryService: SummaryService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    get() {
        return this.summaryService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param("id", MongoIdPipe) id: string) {
        return this.summaryService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateSummaryDTO) {
        return this.summaryService.create(payload);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Body() payload: UpdateSummaryDTO,
        @Param("id", MongoIdPipe) id: string
    ) {
        return this.summaryService.update(id, payload);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id", MongoIdPipe) id: string) {
        return this.summaryService.delete(id);
    }
}
