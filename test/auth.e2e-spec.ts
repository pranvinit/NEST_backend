import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'test1@gmail.com', password: 'secret' })
      .expect(201)
      .then(({ body }) => {
        const { id, email } = body;
        expect(id).toBeDefined();
        expect(email).toEqual('test1@gmail.com');
      });
  });

  it('signup as a new user and get the currently logged in user', async () => {
    // super-agent (jest test api agent does not handle cookie so we have to manually extract it)
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'test@gmail.com', password: 'secret' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/auth/showCurrentUser')
      .set('Cookie', cookie)
      .expect(200)
      .then(({ body }) => {
        const { id, email } = body;
        expect(id).toBeDefined();
        expect(email).toEqual('test@gmail.com');
      });
  });
});
