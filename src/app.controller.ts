import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { EventCreatedEvent } from './modules/kafka/event-created.event';

export class CreateEventForKafKaDto extends EventCreatedEvent {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
