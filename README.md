# 🎥 Watch Stream API - Backend

API RESTful desenvolvida como parte do desafio técnico Fullstack da Watch Brasil. Esta aplicação permite autenticação de usuários, criação e gerenciamento de transmissões (streams), histórico com paginação e integração com Kafka para eventos em tempo real.

---

## 🚀 Tecnologias

- **Node.js** + **Fastify**
- **TypeScript**
- **PostgreSQL** (via Prisma ORM)
- **Kafka** (mensageria de eventos)
- **Docker Compose** (para infraestrutura local)
- **Swagger/OpenAPI** (documentação)
- **JWT** (autenticação)
- **OpenTelemetry** (observabilidade - opcional)
- **TSX** (hot reload em dev)

---

## 📦 Instalação

### Requisitos

- Docker + Docker Compose
- Node.js 20+ (se rodar localmente sem Docker)

### Com Docker

docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build

Acesse a API em: http://localhost:3000

Swagger UI: http://localhost:3000/docs

### 🔐 Autenticação

- Autenticação baseada em JWT.

- Faça login com POST /auth/login

- Copie o token da resposta

- Clique em Authorize no Swagger e cole o token

### 📚 Documentação

Toda a API está documentada em Swagger:
📎 http://localhost:3000/docs

    Inclui:

    Schemas de entrada/saída

    Segurança com JWT (via bearerAuth)

    Códigos de resposta e validações

### 🔄 Endpoints principais

- Auth
  POST /auth/register — cria novo usuário

  POST /auth/login — retorna token JWT

- Usuário
  GET /user/me — dados do usuário autenticado

- Streams
  POST /streams — cria nova transmissão

  POST /streams/:id/start — inicia uma transmissão

  GET /streams/live — lista transmissões ao vivo

  GET /streams/history — lista o histórico (com paginação e filtro por status)

- Kafka
  Evento "stream_started" enviado para tópico stream-events ao iniciar uma transmissão

  src/shared/kafka/consumer.ts escuta e processa eventos

### 🐳 Banco de Dados

Banco: PostgreSQL

Para aplicar migrações:

npx prisma migrate dev

### 🧪 Testes

Jest e Supertest prontos para testes unitários/integrados (estrutura opcional)

Testes de carga podem ser implementados com K6

### 📈 Observabilidade (opcional)

Instrumentação com OpenTelemetry integrada:

Suporte para Jaeger, Grafana, etc.

Exemplo em src/telemetry.ts

### 🧠 Organização do Código

src/modules/\* — lógica de cada domínio (auth, user, stream)

src/shared/ — conexões comuns (prisma, kafka)

src/app.ts — configuração global do Fastify

src/main.ts — entry point da aplicação

### 📦 Deploy Serverless (extra)

A arquitetura foi pensada para fácil deploy via AWS Lambda ou ECS + Fargate, com suporte a fastify-lambda.
