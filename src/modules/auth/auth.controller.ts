// src/modules/auth/auth.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from 'src/shared/prisma';
import bcrypt from 'bcrypt';

export async function registerHandler(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string; password: string };

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return reply.code(409).send({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hashed } });

    return reply.code(201).send({ message: 'User created' });
}

export async function loginHandler(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = await reply.jwtSign({ id: user.id, email: user.email });

    return reply.send({ token });
}
