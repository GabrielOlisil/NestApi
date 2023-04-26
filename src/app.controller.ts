import { ConsoleLogger, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  setHello() {
    const clg = new ConsoleLogger();

    clg.log('Request Post received');
    return { name: 'Gabriel' };
  }
}
