# Padrões de Desenvolvimento

## Padrões de Código

### Convenções de Nomenclatura
- **Variáveis e funções**: camelCase (ex: `getUserTasks`, `taskId`)
- **Classes e componentes**: PascalCase (ex: `TaskController`, `UserService`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_TASKS_PER_USER`, `API_BASE_URL`)
- **Arquivos**: kebab-case (ex: `task-service.js`, `user-controller.js`)

### Formatação
- Usar 2 espaços para indentação
- Sem ponto e vírgula no final das linhas (se usando JavaScript/TypeScript moderno)
- Máximo de 100 caracteres por linha
- Sempre usar aspas simples para strings
- Adicionar vírgula final em objetos e arrays multilinha

### Estrutura de Arquivos
```
src/
├── controllers/     # Handlers de requisições HTTP
├── services/       # Lógica de negócio
├── models/         # Modelos de dados
├── repositories/   # Acesso a dados
├── utils/          # Funções utilitárias
└── tests/          # Testes
```

## Padrões de Commit

### Formato de Mensagens
```
<tipo>(<escopo>): <descrição curta>

<descrição detalhada (opcional)>

<rodapé (opcional)>
```

### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula, etc.
- `refactor`: Refatoração
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

### Exemplos
```
feat(task): adiciona endpoint para criar tarefa

fix(user): corrige validação de email

docs(readme): atualiza instruções de instalação
```

## Padrões de Documentação

### Comentários no Código
- Usar JSDoc para funções públicas
- Comentários explicam "por quê", não "o quê"
- Remover comentários obsoletos

### Exemplo de JSDoc
```javascript
/**
 * Cria uma nova tarefa para o usuário
 * @param {string} userId - ID do usuário
 * @param {Object} taskData - Dados da tarefa
 * @param {string} taskData.title - Título da tarefa
 * @param {string} taskData.description - Descrição da tarefa
 * @returns {Promise<Object>} Tarefa criada
 * @throws {ValidationError} Se os dados forem inválidos
 */
async function createTask(userId, taskData) {
  // implementação
}
```

## Padrões de Testes

### Cobertura Mínima
- 80% de cobertura de código
- 100% de cobertura para lógica de negócio crítica

### Tipos de Testes
- **Unitários**: Testam funções isoladas
- **Integração**: Testam interação entre componentes
- **E2E**: Testam fluxos completos (opcional para MVP)

### Estrutura de Testes
```javascript
describe('TaskService', () => {
  describe('createTask', () => {
    it('deve criar uma tarefa válida', () => {
      // arrange
      // act
      // assert
    });
    
    it('deve lançar erro para dados inválidos', () => {
      // arrange
      // act
      // assert
    });
  });
});
```

## Padrões de Segurança

### Validações Obrigatórias
- Validar todos os inputs do usuário
- Sanitizar dados antes de processar
- Validar tipos e formatos (email, URL, etc.)

### Autenticação e Autorização
- Validar tokens em todas as rotas protegidas
- Verificar permissões antes de operações sensíveis
- Nunca expor informações sensíveis em logs ou respostas

### Tratamento de Erros
- Não expor detalhes internos em erros HTTP
- Logar erros detalhados no servidor
- Retornar mensagens de erro genéricas ao cliente

## Padrões de Performance

### Métricas Esperadas
- Tempo de resposta de API: < 200ms (p95)
- Tempo de inicialização: < 2s
- Uso de memória: < 512MB para MVP

### Otimizações
- Usar cache quando apropriado
- Evitar N+1 queries
- Paginar resultados grandes
- Lazy loading quando possível

## Padrões de Qualidade

### Code Review
- Todas as mudanças devem passar por review
- Mínimo de 1 aprovação antes de merge
- Resolver todos os comentários antes de merge

### Linting e Formatação
- Executar linter antes de commit
- Usar formatação automática
- Manter configurações consistentes no time
