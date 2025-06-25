// src/modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from './auth.controller';

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', registerHandler);
    app.post('/login', loginHandler);
}
