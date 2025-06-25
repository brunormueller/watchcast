// src/modules/auth/auth.controller.ts
import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';

import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from 'src/shared/prisma';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/register', async (req: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = req.body as { email: string; password: string };
        const hashed = await bcrypt.hash(password, 10);
        await prisma.user.create({ data: { email, password: hashed } });
        return reply.code(201).send({ message: 'User created' });
    });

    fastify.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = req.body as { email: string; password: string };
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return reply.code(401).send({ error: 'Invalid credentials' });
        }
        const token = fastify.jwt.sign({ id: user.id });
        return { token };
    });
}
