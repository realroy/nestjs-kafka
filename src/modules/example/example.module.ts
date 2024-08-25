import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { KafkaOptionsFactory, KAFKA_SERCVICE_NAME } from '@/modules/kafka';

import { ExampleController } from './example.controller';

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
  controllers: [ExampleController],
  providers: [],
})
export class ExampleModule {}
