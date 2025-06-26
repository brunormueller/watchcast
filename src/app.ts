import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { streamRoutes } from './modules/stream/stream.routes';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

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

    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Watch Stream API',
                description: 'Documentação da API do desafio técnico Watch Brasil',
                version: '1.0.0'
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ],
            servers: [{ url: 'http://localhost:3000' }]
        }
    });

    await app.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        }
    });

    await app.register(authRoutes, { prefix: '/auth' });
    await app.register(userRoutes, { prefix: '/user' });
    await app.register(streamRoutes);

    return app;
}
