import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientKafka, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';

import { AppModule } from '@/app.module';
import {
  buildKafkaOptions,
  EventCreatedEvent,
  KAFKA_SERCVICE_NAME,
  KafkaController,
} from '@/modules/kafka';

describe('KafkaController (e2e)', () => {
  let app: INestApplication;
  let clientKafka: ClientKafka;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(
      buildKafkaOptions(configService),
      {
        inheritAppConfig: true,
      },
    );

    await app.startAllMicroservices();
    await app.init();

    clientKafka = app.get(KAFKA_SERCVICE_NAME);
  }, 200_000);

  afterAll(async () => {
    await clientKafka.close();
  });

  describe('event_created', () => {
    it('should handle event created', async () => {
      await clientKafka.connect();

      const kafkaController = app.get(KafkaController);

      const spy = jest.spyOn(kafkaController, 'handleEventCreated');
      const event = plainToInstance(EventCreatedEvent, {
        message: 'Hello World',
      });

      await firstValueFrom(
        clientKafka.emit(EventCreatedEvent.EVENT_NAME, event),
      );

      expect(spy).toHaveBeenCalled();

      spy.mockReset();
      spy.mockRestore();
    });
  });
});
