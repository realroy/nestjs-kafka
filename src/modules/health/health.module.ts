import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import {
  KAFKA_SERCVICE_NAME,
  KafkaModule,
  KafkaOptionsFactory,
  KafkaHealthIndicator,
} from '@/modules/kafka';

import HealthController from './health.controller';

@Module({
  imports: [
    TerminusModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: KAFKA_SERCVICE_NAME,
        useClass: KafkaOptionsFactory,
      },
    ]),
    KafkaModule,
  ],
  controllers: [HealthController],
  providers: [KafkaHealthIndicator],
})
export class HealthModule {}
