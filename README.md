# Controle de Estoque (API)

API de controle de estoque desenvolvida na Capacitação de Backend da EJ (Byron), Bloco 4: CRUDs, autenticação e relacionamentos.

> Projeto em andamento. Até agora estão prontos o cadastro, o login e a gestão de usuários. Categorias, produtos e fornecedores vêm nas próximas etapas.

## Tecnologias

- Node.js + Express
- TypeScript
- Prisma ORM (v6)
- PostgreSQL
- JWT (autenticação) e bcryptjs (hash de senha)

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie o arquivo `.env` a partir do exemplo e preencha os valores:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL`: string de conexão do PostgreSQL
   - `JWT_SECRET`: chave secreta usada para assinar os tokens
3. Rode as migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie o servidor:
   ```bash
   yarn dev
   ```

O servidor sobe em `http://localhost:3333`.

## Rotas

| Método | Rota | Autenticação | Descrição |
| ------ | ---- | ------------ | --------- |
| POST | `/user` | Não | Cadastra um usuário |
| POST | `/session` | Não | Faz login e retorna o token JWT |
| GET | `/me` | Sim | Retorna os dados do usuário logado |
| DELETE | `/user/remove?user_id=` | Sim | Remove um usuário pelo id |

As rotas protegidas exigem o header `Authorization: Bearer <token>`.

## Estrutura

```
src/
├── controllers/   # recebem a requisição e devolvem a resposta
├── services/      # regras de negócio e acesso ao banco
├── middlewares/   # ex.: isAuthenticated
├── models/        # interfaces TypeScript
├── prisma/        # instância do Prisma Client
├── routes.ts
└── server.ts
```