# Regras de Negócio

## Visão Geral

Sistema de gerenciamento de tarefas (Task Management System) que permite aos usuários criar, visualizar, atualizar e excluir tarefas.

## Entidades Principais

### User (Usuário)
- **id**: Identificador único (string)
- **name**: Nome completo (string, obrigatório)
- **email**: Email (string, obrigatório, único, formato válido)
- **createdAt**: Data de criação (timestamp)

### Task (Tarefa)
- **id**: Identificador único (string)
- **userId**: ID do usuário proprietário (string, obrigatório)
- **title**: Título da tarefa (string, obrigatório, 3-100 caracteres)
- **description**: Descrição da tarefa (string, opcional, máximo 500 caracteres)
- **status**: Status da tarefa (enum: 'pending', 'in_progress', 'completed')
- **priority**: Prioridade (enum: 'low', 'medium', 'high')
- **dueDate**: Data de vencimento (date, opcional)
- **createdAt**: Data de criação (timestamp)
- **updatedAt**: Data de atualização (timestamp)

## Regras de Negócio

### Usuários

#### RB-001: Criação de Usuário
- **Descrição**: Um usuário pode ser criado com nome e email
- **Validações**:
  - Nome deve ter entre 2 e 100 caracteres
  - Email deve ser único no sistema
  - Email deve ter formato válido (regex básico)
- **Comportamento**: 
  - ID é gerado automaticamente (UUID)
  - createdAt é definido automaticamente
  - Retorna erro se email já existir

#### RB-002: Listagem de Usuários
- **Descrição**: Lista todos os usuários do sistema
- **Comportamento**: 
  - Retorna array de usuários
  - Ordenado por nome (alfabético)
  - Não retorna senhas ou dados sensíveis

#### RB-003: Busca de Usuário por ID
- **Descrição**: Busca um usuário específico pelo ID
- **Comportamento**: 
  - Retorna usuário se encontrado
  - Retorna erro 404 se não encontrado

### Tarefas

#### RB-004: Criação de Tarefa
- **Descrição**: Um usuário pode criar uma tarefa
- **Validações**:
  - userId deve existir no sistema
  - title é obrigatório (3-100 caracteres)
  - description é opcional (máximo 500 caracteres)
  - status padrão é 'pending'
  - priority padrão é 'medium'
  - dueDate deve ser uma data futura (se fornecida)
- **Comportamento**: 
  - ID é gerado automaticamente (UUID)
  - createdAt e updatedAt são definidos automaticamente
  - Retorna erro se userId não existir
  - Retorna erro se dados forem inválidos

#### RB-005: Listagem de Tarefas
- **Descrição**: Lista tarefas de um usuário
- **Parâmetros opcionais**:
  - status: Filtrar por status
  - priority: Filtrar por prioridade
  - sortBy: Ordenar por (title, createdAt, dueDate)
  - sortOrder: Ordem (asc, desc)
- **Comportamento**: 
  - Retorna apenas tarefas do usuário especificado
  - Aplica filtros se fornecidos
  - Ordena conforme parâmetros
  - Retorna erro se userId não existir

#### RB-006: Busca de Tarefa por ID
- **Descrição**: Busca uma tarefa específica pelo ID
- **Comportamento**: 
  - Retorna tarefa se encontrada
  - Retorna erro 404 se não encontrada
  - Verifica se tarefa pertence ao usuário (se userId fornecido)

#### RB-007: Atualização de Tarefa
- **Descrição**: Um usuário pode atualizar sua tarefa
- **Validações**:
  - Tarefa deve existir
  - Tarefa deve pertencer ao usuário
  - Campos opcionais podem ser atualizados parcialmente
  - Validações de formato se aplicam
- **Comportamento**: 
  - Atualiza apenas campos fornecidos
  - updatedAt é atualizado automaticamente
  - Retorna erro se tarefa não existir ou não pertencer ao usuário

#### RB-008: Exclusão de Tarefa
- **Descrição**: Um usuário pode excluir sua tarefa
- **Comportamento**: 
  - Remove tarefa do sistema
  - Retorna erro se tarefa não existir ou não pertencer ao usuário
  - Retorna sucesso mesmo se tarefa já foi excluída (idempotente)

#### RB-009: Transição de Status
- **Descrição**: Status de tarefa segue fluxo específico
- **Fluxo válido**:
  - pending → in_progress
  - pending → completed
  - in_progress → completed
  - in_progress → pending
- **Comportamento**: 
  - Valida transição antes de atualizar
  - Retorna erro se transição for inválida

## Validações Obrigatórias

### Validação de Email
- Formato: deve conter @ e domínio válido
- Regex básico: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Validação de Título
- Mínimo: 3 caracteres
- Máximo: 100 caracteres
- Não pode ser apenas espaços

### Validação de Descrição
- Máximo: 500 caracteres
- Pode ser vazio

### Validação de Data
- dueDate deve ser uma data válida
- Se fornecida, deve ser no futuro ou hoje
- Formato: ISO 8601 (YYYY-MM-DD)

## Casos de Uso Principais

### UC-001: Criar Nova Tarefa
1. Usuário fornece userId, title e opcionalmente description, priority, dueDate
2. Sistema valida dados
3. Sistema verifica se usuário existe
4. Sistema cria tarefa com status 'pending'
5. Sistema retorna tarefa criada

### UC-002: Listar Tarefas do Usuário
1. Usuário fornece userId
2. Sistema verifica se usuário existe
3. Sistema busca todas as tarefas do usuário
4. Sistema aplica filtros (se fornecidos)
5. Sistema ordena resultados
6. Sistema retorna lista de tarefas

### UC-003: Atualizar Status de Tarefa
1. Usuário fornece taskId, userId e novo status
2. Sistema verifica se tarefa existe e pertence ao usuário
3. Sistema valida transição de status
4. Sistema atualiza status
5. Sistema retorna tarefa atualizada

### UC-004: Excluir Tarefa
1. Usuário fornece taskId e userId
2. Sistema verifica se tarefa existe e pertence ao usuário
3. Sistema remove tarefa
4. Sistema retorna confirmação

## Regras de Autorização

### AR-001: Propriedade de Tarefa
- Usuário só pode visualizar, atualizar ou excluir suas próprias tarefas
- Tentativas de acessar tarefas de outros usuários retornam erro 403

### AR-002: Validação de Usuário
- Operações que requerem userId devem validar se usuário existe
- Retorna erro 404 se usuário não existir

## Tratamento de Erros

### Erros de Validação (400)
- Dados inválidos fornecidos
- Formato incorreto
- Campos obrigatórios faltando

### Erros de Não Encontrado (404)
- Usuário não existe
- Tarefa não existe

### Erros de Autorização (403)
- Tentativa de acessar recurso de outro usuário

### Erros Internos (500)
- Erros inesperados do sistema
- Não devem expor detalhes internos ao cliente

## Dados Mockados Iniciais

### Usuários Pré-cadastrados
- 3 usuários de exemplo com IDs fixos
- Emails únicos

### Tarefas Pré-cadastradas
- 5-10 tarefas distribuídas entre os usuários
- Variedade de status e prioridades
- Algumas com dueDate, outras sem

## Fluxos de Trabalho

### Workflow de Tarefa
```
Criada (pending)
    ↓
[Usuário inicia] → in_progress
    ↓
[Usuário completa] → completed
```

### Workflow Alternativo
```
Criada (pending)
    ↓
[Usuário completa direto] → completed
```

## Métricas e Limites (Futuro)

### Limites por Usuário
- Máximo de 1000 tarefas por usuário (futuro)
- Máximo de 100 tarefas pendentes (futuro)

### Performance
- Listagem deve retornar em < 200ms
- Criação deve processar em < 100ms
