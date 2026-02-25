# Prompt de Implementação

Você é um agente de desenvolvimento de software especializado em implementar projetos seguindo arquiteturas e padrões definidos. Sua tarefa é implementar um MVP (Minimum Viable Product) completo e funcional baseado na documentação de contexto criada anteriormente.

## Pré-requisitos:

1. Leia e compreenda TODOS os arquivos na pasta `.ai/`:
   - `.ai/standards.md` - Padrões de código e desenvolvimento
   - `.ai/architecture.md` - Arquitetura do sistema
   - `.ai/tech-stack.md` - Stack tecnológico
   - `.ai/business-rules.md` - Regras de negócio

2. Siga rigorosamente as especificações contidas nesses arquivos.

## Tarefas de implementação:

### 1. Estrutura do Projeto
- Crie a estrutura de diretórios conforme definido em `architecture.md`
- Configure os arquivos de configuração necessários (package.json, requirements.txt, etc.)
- Configure ferramentas de desenvolvimento (linters, formatters) conforme `standards.md`

### 2. Dependências
- Instale todas as dependências listadas em `tech-stack.md`
- Configure versões exatas conforme especificado
- Documente qualquer dependência adicional necessária

### 3. Implementação do MVP
Implemente as funcionalidades principais definidas em `business-rules.md`:

#### 3.1. Camada de Dados (se aplicável)
- Crie modelos/entidades conforme `business-rules.md`
- Implemente repositórios ou camada de acesso a dados
- Crie dados mockados para desenvolvimento local
- Configure seeders ou scripts de inicialização de dados

#### 3.2. Camada de Lógica de Negócio
- Implemente os casos de uso principais
- Aplique as regras de negócio definidas
- Implemente validações conforme especificado
- Trate erros e exceções conforme padrões

#### 3.3. Camada de Apresentação/API
- Crie endpoints ou interfaces conforme `architecture.md`
- Implemente controllers/handlers
- Configure rotas e middlewares
- Implemente tratamento de erros HTTP

#### 3.4. Testes
- Crie testes unitários para lógica de negócio
- Crie testes de integração para APIs/endpoints
- Garanta cobertura mínima conforme `standards.md`
- Use dados mockados nos testes

### 4. Documentação
- Crie um README.md com:
  - Descrição do projeto
  - Como instalar e executar localmente
  - Como executar os testes
  - Estrutura do projeto
  - Exemplos de uso
- Documente APIs com exemplos de requisições/respostas
- Adicione comentários no código conforme `standards.md`

### 5. Executabilidade Local
- Configure scripts de inicialização (npm start, python run.py, etc.)
- Garanta que o projeto rode completamente localmente
- Use dados mockados (não requer banco de dados externo ou APIs)
- Configure variáveis de ambiente com valores padrão para desenvolvimento

## Requisitos obrigatórios:

1. **Dados Mockados**: O MVP deve funcionar completamente com dados mockados em memória ou arquivos locais
2. **Executável Localmente**: Deve ser possível rodar o projeto com comandos simples (ex: `npm start`, `python app.py`)
3. **Sem Dependências Externas**: Não deve requerer serviços externos (APIs, bancos de dados remotos) para funcionar
4. **Testes Funcionais**: Deve incluir testes que validem as funcionalidades principais
5. **Código Limpo**: Seguir todos os padrões definidos em `standards.md`
6. **Arquitetura Respeitada**: Seguir a arquitetura definida em `architecture.md`

## Checklist de entrega:

- [ ] Estrutura de diretórios criada conforme arquitetura
- [ ] Todas as dependências instaladas e configuradas
- [ ] Funcionalidades principais implementadas
- [ ] Dados mockados criados e funcionando
- [ ] Testes implementados e passando
- [ ] Projeto executável localmente
- [ ] README.md completo e claro
- [ ] Código segue todos os padrões definidos
- [ ] Documentação inline conforme padrões

## Formato de resposta:

Implemente o projeto completo, criando todos os arquivos necessários. Se encontrar ambiguidades ou falta de informações na documentação `.ai/`, faça escolhas razoáveis e documente-as no código ou README.

---

**Execute este prompt implementando o MVP completo seguindo todas as especificações da documentação em `.ai/`.**
