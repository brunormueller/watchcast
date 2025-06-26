// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { profileSchema } from './user.schema';

export async function userRoutes(app: FastifyInstance) {
    app.get('/profile', { schema: profileSchema, onRequest: [app.authenticate] }, async (req, reply) => {
        const user = req.user;
        return { profile: user };
    });
}
