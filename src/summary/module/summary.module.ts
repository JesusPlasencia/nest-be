import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SummaryController } from "../controller/summary.controller";
import { Summary, SummarySchema } from "../entity/summary.entity";
import { SummaryService } from "../service/summary.service";

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Summary.name,
      schema: SummarySchema
    }
  ])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule { }
