// src/modules/stream/stream.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/prisma';
import { sendStreamEvent } from 'src/shared/kafka/producer';

export async function createStreamHandler(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as any;
  const { title } = req.body as { title: string };

  const stream = await prisma.stream.create({
    data: {
      title,
      userId: user.id
    }
  });

  return reply.code(201).send(stream);
}

export async function startStreamHandler(req: FastifyRequest, reply: FastifyReply) {
  const user = req.user as any;
  const { id } = req.params as { id: string };

  const stream = await prisma.stream.findUnique({ where: { id } });
  if (!stream || stream.userId !== user.id) {
    return reply.code(403).send({ error: 'Not allowed' });
  }

  const updated = await prisma.stream.update({
    where: { id },
    data: { isLive: true }
  });

  await sendStreamEvent({
    streamId: updated.id,
    title: updated.title,
    eventType: 'stream_started'
  });

  return reply.send(updated);
}

export async function listLiveStreamsHandler(req: FastifyRequest, reply: FastifyReply) {
  const liveStreams = await prisma.stream.findMany({
    where: { isLive: true },
    include: {
      user: { select: { email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return reply.send(liveStreams);
}
