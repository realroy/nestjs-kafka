import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config';
import { HealthModule } from '@/modules/health';
import { ExampleModule } from '@/modules/example';
import { KafkaModule } from '@/modules/kafka';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [() => ({ ...process.env })],
    }),
    KafkaModule,
    HealthModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
