import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller(`/api/article`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/list')
  getHello(@Query() query): string {
    const { last } = query;
    return this.appService.getHello(Number(last));
  }
}
