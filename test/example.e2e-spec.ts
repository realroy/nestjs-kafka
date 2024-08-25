import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@/app.module';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/kafka/event (POST)', () => {
    it('should return status created', async () => {
      const res = await request(app.getHttpServer()).post('/kafka/event');

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.type).toBe('application/json');
      expect(res.body).toEqual([
        {
          baseOffset: expect.any(String),
          errorCode: expect.any(Number),
          logAppendTime: '-1',
          logStartOffset: '0',
          partition: expect.any(Number),
          topicName: 'event_created',
        },
      ]);
    });
  });
});
