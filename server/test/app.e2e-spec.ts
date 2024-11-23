import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const token = {authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOGQ0NjFkZC0zNDM1LTRlMGYtODI3Yy03N2ZjNjkzN2VhMGEiLCJpZCI6IjE4ZDQ2MWRkLTM0MzUtNGUwZi04MjdjLTc3ZmM2OTM3ZWEwYSIsImVtYWlsIjoicm9tZXJhQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTczMjMwNDk4MSwiZXhwIjoxNzMyMzkxMzgxfQ.dkjKQMhv9RIJlB-RE74sS83luH6AO_H7SB-0pXB1jOk'}
  let userId = ''

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /users/ returns an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/:uuid returns a user with an Unauthorized status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/18d461dd-3435-4e0f-827c-77fc6937ea0a',
    );
    expect(req.status).toBe(401);
    expect(req.body.message).toBe('Bearer token not found');
  });

  it('Get /users/:uuid returns a user with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users/18d461dd-3435-4e0f-827c-77fc6937ea0a')
      .set('Authorization', token.authorization);
    expect(req.status).toBe(200);
    expect(req.body.message).not.toBe('Bearer token not found');
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Post /auth/signUp returns a user with Created status code', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signUp').send({
      name: 'Tomas Romera',
      email: `mial+${Date.now()}@gmail.com`,
      password: 'admin',
      phone: '12345',
      address: 'No name NaN',
    });
    expect(req.status).toBe(201);
    expect(req.body).toBeDefined();
    expect(req.body).toHaveProperty('id');
    userId = req.body.id;
  });

  it('Post /auth/signUp returns email already exists with a 400 status code', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signUp').send({
      name: 'Tomas Romera',
      email: 'mial@gmail.com',
      password: 'admin',
      phone: '12345',
      address: 'No name NaN',
    });
    expect(req.status).toBe(400);
    expect(req.body.message).toBe('Email already exist');
  });

  it('Post /auth/signIn returns a token bearer with an OK status', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signIn').send({
      password: 'admin',
      email: 'mial@gmail.com',
    });
    expect([200, 201]).toContain(req.status);
    expect(req.body).toHaveProperty('token');
    token.authorization = `Bearer ${req.body.token}`;
  });

  it('Post /auth/signIn returns a 404 status code for invalid email', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signIn').send({
      password: 'admin',
      email: 'aaaaaa@gmail.com',
    });
    expect(req.status).toBe(404);
    expect(req.body.message).toBe('Email not found');
  });

  it('Post /auth/signIn returns a 400 status code for invalid credentials', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signIn').send({
      password: '',
      email: 'mial@gmail.com',
    });
    expect(req.status).toBe(400);
    expect(req.body.message).toBe('Invalid Credentials');
  });

  it('Get /users/:id returns a user with a 200 status code', async () => {
    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', token.authorization);
    expect(req.status).toBe(200);
    expect(req.body).toBeDefined();
  });

  it('Delete /users/:id returns a user with a 200 status code', async () => {
    const req = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', token.authorization);
    expect(req.status).toBe(200);
    expect(req.body).toBeDefined();
  });
});


