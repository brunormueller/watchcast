export const profileSchema = {
    description: 'Busca Usuário',
    tags: ['User'],
    security: [
        {
            bearerAuth: []
        }
    ],
    response: {
        200: {
            description: 'Usuário criado com sucesso',
            type: 'object',
            properties: {
                profile: {
                    id: { type: "string" },
                    email: { type: "string" },
                    iat: { type: "number" },
                    exp: { type: "number" }
                }
            }
        }
    }
};