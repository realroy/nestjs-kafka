import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/health (GET)', () => {
    let res: request.Response;

    beforeEach(async () => {
      res = await request(app.getHttpServer()).get('/health');
    });

    it('should return status ok', () => {
      expect(res.status).toBe(HttpStatus.OK);
    });

    it('should return a json response', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return a json response', () => {
      expect(res.body).toEqual(
        expect.objectContaining({
          details: expect.objectContaining({
            kafka: expect.objectContaining({
              status: 'up',
            }),
          }),
          status: 'ok',
        }),
      );
    });
  });
});
