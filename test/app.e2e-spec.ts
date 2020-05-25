import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/auth/signup', async () => {
    const input = {
      name: 'a',
      email: 'a@a.com',
      password: 'aaaaaaaa',
    };
    await request(app.getHttpServer())
      .post('/api/auth/signup')
      .send(input)
      .expect(201);
  });

  it('POST /api/auth/signin', async () => {
    const input = {
      name: 'a',
      password: 'aaaaaaaa',
    };
    const res = await request(app.getHttpServer())
      .post('/api/auth/signin')
      .send(input)
      .expect(201);
    token = res.body.token as string;
  });

  it('GET /api/users', async () => {
    const users = await request(app.getHttpServer())
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(users.body[0].id).toBe(1);
    expect(users.body[0].name).toBe('a');
  });

  it('GET /api/users/a', async () => {
    const user = await request(app.getHttpServer())
      .get('/api/users/a')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(user.body.id).toBe(1);
    expect(user.body.name).toBe('a');
  });

  it('GraphQL signUp', async () => {
    const q = `
      mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
          id
        }
      }
    `;
    const v = `
      {
        "input": {
          "name": "b",
          "email": "b@b.com",
          "password": "bbbbbbbb"
        }
      }
    `;
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: q, variables: v })
      .expect(200);

    expect(res.body.data.signUp).toHaveProperty('id');
  });

  it('GraphQL signIn', async () => {
    const q = `
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          token
        }
      }
    `;
    const v = `
      {
        "input": {
          "name": "b",
          "password": "bbbbbbbb"
        }
      }
    `;
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: q, variables: v })
      .expect(200);

    token = res.body.data.signIn.token as string;
    expect(token.length).toBeGreaterThan(0);
  });

  it('GraphQL users', async () => {
    const q = `
      query Users {
        users {
          id
          name
          email
        }
      }
    `;
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: q })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.data.users[0]).toHaveProperty('id');
    expect(res.body.data.users[0]).toHaveProperty('name');
    expect(res.body.data.users[0]).toHaveProperty('email');
  });

  it('GraphQL user', async () => {
    const q = `
      query User($input: String!) {
        user(name: $input) {
          id
          name
          email
        }
      }
    `;
    const v = `
      {
        "input": "b"
      }
    `;
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: q, variables: v })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.data.user).toHaveProperty('id');
    expect(res.body.data.user).toHaveProperty('name');
    expect(res.body.data.user).toHaveProperty('email');
  });
});
