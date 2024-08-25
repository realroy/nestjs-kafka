import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { KAFKA_SERCVICE_NAME } from '../kafka/kafka.config';
import { EventCreatedEvent } from '../kafka/event-created.event';

export class CreateEventForKafKaDto extends EventCreatedEvent {}

@Controller()
export class ExampleController {
  constructor(
    @Inject(KAFKA_SERCVICE_NAME)
    private readonly clientKafka: ClientKafka,
  ) {}

  @Post('kafka/event')
  async createEventForKafka(@Body() body: CreateEventForKafKaDto) {
    const event = plainToInstance(EventCreatedEvent, body);

    const response = await firstValueFrom(
      this.clientKafka.emit(EventCreatedEvent.EVENT_NAME, {
        key: [EventCreatedEvent.EVENT_NAME, Date.now()].join('-'),
        value: event,
      }),
    );

    return response;
  }
}
