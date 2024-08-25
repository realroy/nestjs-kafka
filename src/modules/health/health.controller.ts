import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { KafkaHealthIndicator } from '../kafka';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('/health')
export default class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly kafkaHealthIndicator: KafkaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.kafkaHealthIndicator.isHealthy('kafka'),
    ]);
  }
}
