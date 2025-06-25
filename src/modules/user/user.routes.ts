// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
    app.get('/profile', { onRequest: [app.authenticate] }, async (req, reply) => {
        const user = req.user;
        return { profile: user };
    });
}
