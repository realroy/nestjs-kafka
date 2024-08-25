import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Kafka } from 'kafkajs';

import { KAFKA_SERCVICE_NAME } from './kafka.config';

@Injectable()
export class KafkaHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(KAFKA_SERCVICE_NAME)
    private readonly clientKafka: ClientKafka,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // const client = new Kafka()
      const client = this.clientKafka.createClient<Kafka>();
      const cluster = await client.admin().describeCluster();

      return this.getStatus(key, true, cluster);
    } catch (error) {
      throw new HealthCheckError('KAFKA_HEALTH_CHECK_FAILED', error);
    }
  }
}
