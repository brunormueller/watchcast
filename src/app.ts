import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { streamRoutes } from './modules/stream/stream.routes';

dotenv.config();

export async function buildApp() {
    const app = Fastify({ logger: true });

    await app.register(cors);
    await app.register(jwt, {
        secret: process.env.JWT_SECRET!,
        sign: { expiresIn: '1h' }
    });

    app.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    await app.register(authRoutes, { prefix: '/auth' });
    await app.register(userRoutes, { prefix: '/user' });
    await app.register(streamRoutes);

    return app;
}
