import { EnvironmentVariables } from '@/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KafkaOptions,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

export const KAFKA_SERCVICE_NAME = 'KAFKA_SERVICE' as const;

@Injectable()
export class KafkaOptionsFactory implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createClientOptions() {
    return buildKafkaOptions(this.configService);
  }
}

export function buildKafkaOptions(
  configService: ConfigService<EnvironmentVariables>,
): KafkaOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.getOrThrow('KAFKA_CLIENT_ID'),
        brokers: configService.getOrThrow('KAFKA_BROKERS'),
      },
      consumer: {
        groupId: configService.getOrThrow('KAFKA_CONSUMER_GROUP_ID'),
        allowAutoTopicCreation: false,
      },
      producer: {
        transactionalId: 'my-transactional-id',
        allowAutoTopicCreation: false,
        idempotent: true,
      },
      postfixId: '',
    },
  };
}
