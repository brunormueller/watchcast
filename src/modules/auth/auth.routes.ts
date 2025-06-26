// src/modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', { schema: registerSchema }, registerHandler);
    app.post('/login', { schema: loginSchema }, loginHandler);
}
