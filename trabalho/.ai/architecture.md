# Arquitetura do Sistema

## Visão Geral

O sistema segue uma arquitetura em camadas (Layered Architecture) com separação clara de responsabilidades. Esta arquitetura facilita manutenção, testes e escalabilidade.

## Padrão Arquitetural

**Layered Architecture (Arquitetura em Camadas)**

```
┌─────────────────────────────────┐
│   Presentation Layer (API)      │  ← Controllers, Routes
├─────────────────────────────────┤
│   Business Logic Layer          │  ← Services, Use Cases
├─────────────────────────────────┤
│   Data Access Layer              │  ← Repositories, Models
├─────────────────────────────────┤
│   Data Storage (Mock)            │  ← In-Memory Storage
└─────────────────────────────────┘
```

## Componentes Principais

### 1. Presentation Layer (Camada de Apresentação)
**Responsabilidade**: Receber requisições HTTP, validar inputs, formatar respostas

**Componentes**:
- **Controllers**: Processam requisições HTTP
- **Routes**: Definem endpoints da API
- **Middlewares**: Validação, autenticação, tratamento de erros
- **DTOs**: Data Transfer Objects para entrada/saída

**Fluxo**:
1. Recebe requisição HTTP
2. Valida dados de entrada
3. Chama Service apropriado
4. Formata e retorna resposta

### 2. Business Logic Layer (Camada de Lógica de Negócio)
**Responsabilidade**: Implementar regras de negócio e orquestrar operações

**Componentes**:
- **Services**: Implementam lógica de negócio
- **Use Cases**: Casos de uso específicos
- **Validators**: Validações de negócio
- **Domain Models**: Entidades de domínio

**Fluxo**:
1. Recebe dados do Controller
2. Aplica regras de negócio
3. Valida operação
4. Chama Repository para persistência
5. Retorna resultado

### 3. Data Access Layer (Camada de Acesso a Dados)
**Responsabilidade**: Abstrair acesso a dados

**Componentes**:
- **Repositories**: Interface para acesso a dados
- **Models**: Estrutura de dados
- **Mappers**: Conversão entre modelos e entidades

**Fluxo**:
1. Recebe dados do Service
2. Converte para formato de armazenamento
3. Persiste/recupera dados
4. Retorna entidade de domínio

### 4. Data Storage (Armazenamento)
**Responsabilidade**: Armazenar dados (mockado para MVP)

**Implementação**:
- Armazenamento em memória (Map/Array)
- Dados mockados pré-carregados
- Sem persistência entre execuções

## Fluxo de Dados

### Exemplo: Criar Tarefa

```
1. Cliente → POST /api/tasks
   ↓
2. Route → TaskController.createTask()
   ↓
3. Controller → TaskService.createTask()
   ↓
4. Service → Valida regras de negócio
   ↓
5. Service → TaskRepository.save()
   ↓
6. Repository → Armazena em memória
   ↓
7. Repository → Retorna Task
   ↓
8. Service → Retorna Task
   ↓
9. Controller → Formata resposta HTTP
   ↓
10. Cliente ← 201 Created + Task
```

## Estrutura de Diretórios

```
src/
├── controllers/          # Camada de apresentação
│   ├── task-controller.js
│   └── user-controller.js
├── services/             # Camada de lógica de negócio
│   ├── task-service.js
│   └── user-service.js
├── repositories/         # Camada de acesso a dados
│   ├── task-repository.js
│   └── user-repository.js
├── models/               # Modelos de dados
│   ├── task.js
│   └── user.js
├── middlewares/          # Middlewares
│   ├── error-handler.js
│   └── validator.js
├── utils/                # Utilitários
│   └── logger.js
└── tests/                # Testes
    ├── unit/
    └── integration/
```

## Princípios de Design

### SOLID
- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Subtipos devem ser substituíveis por seus tipos base
- **I**nterface Segregation: Interfaces específicas ao invés de genéricas
- **D**ependency Inversion: Depender de abstrações, não de implementações

### DRY (Don't Repeat Yourself)
- Evitar duplicação de código
- Extrair lógica comum para funções/classes utilitárias

### KISS (Keep It Simple, Stupid)
- Preferir soluções simples
- Evitar over-engineering

### Separation of Concerns
- Cada camada tem responsabilidade bem definida
- Baixo acoplamento entre camadas

## Padrões de Comunicação

### API RESTful
- **GET**: Recuperar recursos
- **POST**: Criar recursos
- **PUT**: Atualizar recursos (completo)
- **PATCH**: Atualizar recursos (parcial)
- **DELETE**: Remover recursos

### Formato de Resposta
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Formato de Erro
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [ ... ]
  }
}
```

## Estratégia de Deploy

### MVP (Desenvolvimento Local)
- Execução local com Node.js
- Dados em memória
- Sem necessidade de banco de dados
- Porta padrão: 3000

### Futuro (Produção)
- Containerização com Docker
- Banco de dados PostgreSQL
- Deploy em cloud (AWS, Azure, GCP)
- CI/CD com GitHub Actions

## Tratamento de Erros

### Hierarquia de Erros
```
Error (base)
├── ValidationError (400)
├── NotFoundError (404)
├── UnauthorizedError (401)
└── InternalServerError (500)
```

### Middleware de Erros
- Captura todos os erros não tratados
- Formata resposta de erro consistente
- Loga erros para debugging

## Segurança

### Validação de Input
- Validar todos os inputs
- Sanitizar dados
- Prevenir injection attacks

### Autenticação (Futuro)
- JWT tokens
- Refresh tokens
- Rate limiting
