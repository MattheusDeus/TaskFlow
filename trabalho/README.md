# Task Management MVP

MVP de sistema de gerenciamento de tarefas implementado usando agentes de IA, seguindo arquitetura em camadas e padrões definidos na documentação `.ai/`.

## 📋 Sobre o Projeto

Este projeto é um MVP (Minimum Viable Product) de um sistema de gerenciamento de tarefas que permite:
- Criar e gerenciar usuários
- Criar, listar, atualizar e excluir tarefas
- Filtrar e ordenar tarefas
- Validar regras de negócio

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- **Presentation Layer**: Controllers e Routes (processamento de requisições HTTP)
- **Business Logic Layer**: Services (regras de negócio)
- **Data Access Layer**: Repositories (acesso a dados)
- **Data Storage**: Armazenamento em memória (mockado)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior

### Instalação

1. Instale as dependências:
```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado com nodemon (reinicia automaticamente ao salvar arquivos).

### Executar em Produção

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Endpoints da API

### Health Check
- `GET /health` - Verifica se a API está funcionando

### Usuários

- `POST /api/users` - Cria um novo usuário
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:userId` - Busca usuário por ID

### Tarefas

- `POST /api/users/:userId/tasks` - Cria uma nova tarefa
- `GET /api/users/:userId/tasks` - Lista tarefas de um usuário
  - Query params opcionais:
    - `status`: Filtrar por status (pending, in_progress, completed)
    - `priority`: Filtrar por prioridade (low, medium, high)
    - `sortBy`: Ordenar por (title, createdAt, dueDate)
    - `sortOrder`: Ordem (asc, desc)
- `GET /api/users/:userId/tasks/:taskId` - Busca tarefa por ID
- `PUT /api/users/:userId/tasks/:taskId` - Atualiza uma tarefa
- `DELETE /api/users/:userId/tasks/:taskId` - Remove uma tarefa

## 📝 Exemplos de Uso

### Criar Usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com"
  }'
```

### Criar Tarefa

```bash
curl -X POST http://localhost:3000/api/users/user-1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "description": "Descrição da tarefa",
    "priority": "high",
    "dueDate": "2024-02-01"
  }'
```

### Listar Tarefas com Filtros

```bash
curl "http://localhost:3000/api/users/user-1/tasks?status=pending&sortBy=dueDate&sortOrder=asc"
```

### Atualizar Tarefa

```bash
curl -X PUT http://localhost:3000/api/users/user-1/tasks/task-1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "priority": "high"
  }'
```

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Ver Cobertura de Testes

```bash
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
.
├── .ai/                      # Documentação de contexto
│   ├── standards.md         # Padrões de desenvolvimento
│   ├── architecture.md      # Arquitetura do sistema
│   ├── tech-stack.md        # Stack tecnológico
│   └── business-rules.md    # Regras de negócio
├── src/
│   ├── controllers/          # Controllers HTTP
│   ├── services/            # Lógica de negócio
│   ├── repositories/        # Acesso a dados
│   ├── models/              # Modelos de dados
│   ├── middlewares/         # Middlewares
│   ├── routes.js            # Definição de rotas
│   └── index.js             # Arquivo principal
├── tests/                   # Testes
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)
- `npm test` - Executa os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com cobertura
- `npm run lint` - Verifica código com ESLint
- `npm run lint:fix` - Corrige problemas de lint automaticamente

## 📊 Dados Mockados

O sistema vem com dados mockados pré-carregados:

- **3 usuários** de exemplo (user-1, user-2, user-3)
- **5 tarefas** distribuídas entre os usuários

Você pode usar esses IDs para testar a API imediatamente.

## 🎯 Funcionalidades Implementadas

✅ CRUD completo de usuários
✅ CRUD completo de tarefas
✅ Validação de dados de entrada
✅ Filtros e ordenação de tarefas
✅ Validação de regras de negócio
✅ Tratamento de erros
✅ Dados mockados em memória
✅ Testes unitários e de integração

## 📖 Documentação Adicional

Consulte a pasta `.ai/` para documentação detalhada sobre:
- Padrões de código e desenvolvimento
- Arquitetura do sistema
- Stack tecnológico utilizado
- Regras de negócio implementadas

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP
- **ESLint** - Linter de código
- **Prettier** - Formatação de código

## 📝 Notas

- Este é um MVP com dados mockados em memória
- Os dados são perdidos ao reiniciar o servidor
- Não há autenticação implementada (será adicionada em versões futuras)
- O sistema está pronto para ser expandido com banco de dados real

## 🤝 Contribuindo

Este projeto foi criado como parte de uma atividade acadêmica sobre implementação de MVP usando agentes.

## 📄 Licença

MIT
