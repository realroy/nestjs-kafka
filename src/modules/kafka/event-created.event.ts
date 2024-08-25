import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const eventCreatedSchema = z.object({
  message: extendApi(z.coerce.string(), { description: 'Message' }),
});

export class EventCreatedEvent extends createZodDto(
  extendApi(eventCreatedSchema),
) {
  static EVENT_NAME = 'event_created' as const;

  toString() {
    return JSON.stringify({ message: this.message });
  }
}
