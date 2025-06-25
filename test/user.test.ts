// test/user.test.ts
import request from 'supertest';
import { buildApp } from '../src/app';

let app: Awaited<ReturnType<typeof buildApp>>;

beforeAll(async () => {
    app = await buildApp();
});

describe('User registration', () => {
    it('should create a new user', async () => {
        const res = await request(app.server).post('/register').send({
            email: 'test@watch.com',
            password: '123456'
        });

        expect(res.statusCode).toBe(201);
    });
});
