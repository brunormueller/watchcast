import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

export async function buildApp() {
    const app = Fastify({ logger: true });

    await app.register(cors);
    await app.register(jwt, { secret: process.env.JWT_SECRET! });

    // rotas serão registradas aqui futuramente

    return app;
}
