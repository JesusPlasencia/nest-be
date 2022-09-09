import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return 'Hola Mundo!';
  }

  @Get('new')
  newEndpoint(): string {
    return 'I\'m brand new...';
  }

  @Get('/old/')
  oldEndpoint(): string {
    return 'Deprecated Endpoint...';
  }






}
