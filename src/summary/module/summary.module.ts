import { Module } from "@nestjs/common";
import { SummaryController } from "../controller/summary.controller";
import { SummaryService } from "../service/summary.service";

@Module({
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
