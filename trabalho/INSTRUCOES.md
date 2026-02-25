# Instruções do Projeto

## 📋 Entregáveis

Este projeto contém todos os entregáveis solicitados:

### 1. Prompt de Geração de Contexto
**Arquivo**: `prompt-geracao-contexto.md`

Este prompt deve ser usado para gerar a estrutura de documentação `.ai/` com os seguintes arquivos:
- `.ai/standards.md` - Padrões de código e desenvolvimento
- `.ai/architecture.md` - Arquitetura do sistema
- `.ai/tech-stack.md` - Stack tecnológico
- `.ai/business-rules.md` - Regras de negócio

**Como usar**: Copie o conteúdo do arquivo `prompt-geracao-contexto.md` e cole em um chat de IA (como ChatGPT, Claude, etc.) para gerar a documentação de contexto.

### 2. Prompt de Implementação
**Arquivo**: `prompt-implementacao.md`

Este prompt deve ser usado após a geração do contexto para implementar o MVP completo seguindo a documentação criada.

**Como usar**: 
1. Primeiro, execute o prompt de geração de contexto
2. Depois, copie o conteúdo do arquivo `prompt-implementacao.md` e cole no mesmo chat
3. O agente irá implementar o projeto completo baseado na documentação `.ai/`

### 3. MVP Implementado
**Status**: ✅ Completo e funcional

O MVP foi implementado seguindo a documentação em `.ai/` e está pronto para execução local.

## 🚀 Como Executar o MVP

### Instalação
```bash
npm install
```

### Executar
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Testar
```bash
npm test
```

## 📁 Estrutura Criada

```
.
├── .ai/                          # Documentação de contexto (já criada)
│   ├── standards.md
│   ├── architecture.md
│   ├── tech-stack.md
│   └── business-rules.md
├── prompt-geracao-contexto.md    # Prompt para gerar contexto
├── prompt-implementacao.md       # Prompt para implementar MVP
├── src/                          # Código fonte do MVP
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── middlewares/
│   ├── routes.js
│   └── index.js
├── tests/                        # Testes
├── package.json
├── README.md
└── INSTRUCOES.md                # Este arquivo
```

## 🎯 Funcionalidades do MVP

✅ Sistema de gerenciamento de tarefas completo
✅ CRUD de usuários e tarefas
✅ Validações de regras de negócio
✅ Filtros e ordenação
✅ Dados mockados pré-carregados
✅ Testes unitários e de integração
✅ Executável localmente sem dependências externas

## 📝 Notas para Demonstração

### Dados Mockados Disponíveis

**Usuários**:
- `user-1` - João Silva
- `user-2` - Maria Santos
- `user-3` - Pedro Oliveira

**Tarefas**:
- 5 tarefas pré-cadastradas distribuídas entre os usuários

### Exemplos de Requisições

**Listar usuários**:
```bash
curl http://localhost:3000/api/users
```

**Listar tarefas de um usuário**:
```bash
curl http://localhost:3000/api/users/user-1/tasks
```

**Criar nova tarefa**:
```bash
curl -X POST http://localhost:3000/api/users/user-1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nova tarefa", "priority": "high"}'
```

## 🎥 Para o Vídeo de Demonstração

1. Mostrar a estrutura `.ai/` criada
2. Explicar os dois prompts criados
3. Demonstrar o MVP rodando localmente
4. Testar alguns endpoints da API
5. Executar os testes
6. Comentar sobre:
   - Uso do agente para gerar contexto
   - Uso do agente para implementar
   - Dificuldades encontradas (se houver)
   - Pontos positivos da abordagem

## ⚠️ Dificuldades Encontradas

1. **Geração de IDs únicos**: Implementada solução simples usando timestamp + random
2. **Validação de transições de status**: Implementada lógica de validação de estados
3. **Estrutura de testes**: Configurada estrutura de testes unitários e de integração

## ✨ Pontos Positivos

1. **Documentação completa**: A estrutura `.ai/` fornece contexto completo
2. **Arquitetura clara**: Separação de responsabilidades facilita manutenção
3. **Testes incluídos**: Cobertura de testes ajuda a garantir qualidade
4. **Executável localmente**: Não requer configurações complexas
5. **Dados mockados**: Permite testar imediatamente sem setup adicional
