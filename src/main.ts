import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

import { EnvironmentVariables } from '@/config';

import { buildKafkaOptions } from '@/modules/kafka';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService<EnvironmentVariables>);

  app.connectMicroservice<MicroserviceOptions>(buildKafkaOptions(config), {
    inheritAppConfig: true,
  });

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setVersion(config.getOrThrow('SWAGGER_DOC_VERSION'))
      .build(),
  );

  SwaggerModule.setup(config.getOrThrow('SWAGGER_PATH'), app, document, {
    explorer: true,
  });

  await app.startAllMicroservices();
  await app.listen(config.getOrThrow('PORT'));
}

bootstrap();
