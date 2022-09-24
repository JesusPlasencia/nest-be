import { Controller, Get, Param, Query, UseGuards, SetMetadata } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiKeyGuard } from 'src/auth/guards/api-key/api-key.guard'
import { Public } from 'src/auth/decorators/public/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get("new")
  newEndpoint(): string {
    return "I'm brand new...";
  }

  @Get("/old/")
  oldEndpoint(): string {
    return "Deprecated Endpoint...";
  }

  @Get("tasks")
  getTasks() {
    return this.appService.getTasks();
  }
}
