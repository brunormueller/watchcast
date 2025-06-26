export const registerSchema = {
    description: 'Cria um novo usuário',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        201: {
            description: 'Usuário criado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};
export const loginSchema = {
    description: 'Login',
    tags: ['Auth'],
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        201: {
            description: 'Logado com sucesso',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};