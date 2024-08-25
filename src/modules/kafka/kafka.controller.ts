import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { KafkaService } from './kafka.service';
import { EventCreatedEvent } from './event-created.event';

@Controller()
export class KafkaController {
  private logger: Logger;

  constructor(private readonly kafkaService: KafkaService) {
    this.logger = new Logger(KafkaController.name);
  }

  @EventPattern(EventCreatedEvent.EVENT_NAME)
  handleEventCreated(
    @Payload() data: EventCreatedEvent,
    @Ctx() context: KafkaContext,
  ) {
    this.logger.log(JSON.stringify(data));
    this.logger.debug(JSON.stringify(context));
  }
}
