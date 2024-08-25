import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { KAFKA_SERCVICE_NAME, KafkaOptionsFactory } from './kafka.config';
import { KafkaHealthIndicator } from './kafka.health-indicator';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: KAFKA_SERCVICE_NAME,
        useClass: KafkaOptionsFactory,
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [KafkaService, KafkaHealthIndicator],
  exports: [KafkaHealthIndicator],
})
export class KafkaModule implements OnModuleDestroy {
  constructor(
    @Inject(KAFKA_SERCVICE_NAME)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleDestroy() {
    // return await this.clientKafka.close();
  }
}
