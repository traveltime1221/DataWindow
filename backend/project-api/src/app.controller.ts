import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 控制器負責處理 HTTP 請求

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
