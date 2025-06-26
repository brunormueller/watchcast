export const streamsSchema = {
    description: 'Cria um novo stream',
    tags: ['Stream'],
    security: [
        {
            bearerAuth: []
        }
    ],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            title: { type: 'string' }
        }
    },
    response: {
        201: {
            description: 'Live criada com sucesso!',
            type: 'object',
            properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                isLive: { type: 'boolean' },
                userId: { type: 'string' },
                createdAt: { type: 'string' }
            }
        }
    }
};
export const startStreamSchema = {
    description: 'Iniciar novo stream',
    tags: ['Stream'],
    security: [
        {
            bearerAuth: []
        }
    ],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            title: { type: 'string' }
        }
    },
    response: {
        201: {
            description: 'Live criada com sucesso!',
            type: 'object',
            properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                isLive: { type: 'boolean' },
                userId: { type: 'string' },
                createdAt: { type: 'string' }
            }
        }
    }
};