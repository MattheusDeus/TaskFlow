/**
 * Repositório de Tarefas
 * Gerencia acesso a dados de tarefas (mockado em memória)
 */
class TaskRepository {
  constructor() {
    // Armazenamento em memória
    this.tasks = new Map()
    this.initMockData()
  }

  /**
   * Inicializa dados mockados
   */
  initMockData() {
    const mockTasks = [
      {
        id: 'task-1',
        userId: 'user-1',
        title: 'Implementar API de tarefas',
        description: 'Criar endpoints para CRUD de tarefas',
        status: 'completed',
        priority: 'high',
        dueDate: '2024-01-20',
        createdAt: '2024-01-18T10:00:00.000Z',
        updatedAt: '2024-01-19T15:00:00.000Z',
      },
      {
        id: 'task-2',
        userId: 'user-1',
        title: 'Escrever testes unitários',
        description: 'Cobrir todas as funções principais',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2024-01-25',
        createdAt: '2024-01-19T09:00:00.000Z',
        updatedAt: '2024-01-20T10:00:00.000Z',
      },
      {
        id: 'task-3',
        userId: 'user-2',
        title: 'Revisar documentação',
        description: 'Revisar e atualizar README',
        status: 'pending',
        priority: 'medium',
        dueDate: null,
        createdAt: '2024-01-20T11:00:00.000Z',
        updatedAt: '2024-01-20T11:00:00.000Z',
      },
      {
        id: 'task-4',
        userId: 'user-2',
        title: 'Configurar CI/CD',
        description: 'Configurar pipeline de deploy',
        status: 'pending',
        priority: 'low',
        dueDate: '2024-02-01',
        createdAt: '2024-01-21T08:00:00.000Z',
        updatedAt: '2024-01-21T08:00:00.000Z',
      },
      {
        id: 'task-5',
        userId: 'user-3',
        title: 'Otimizar performance',
        description: 'Melhorar tempo de resposta da API',
        status: 'in_progress',
        priority: 'medium',
        dueDate: '2024-01-30',
        createdAt: '2024-01-22T14:00:00.000Z',
        updatedAt: '2024-01-23T09:00:00.000Z',
      },
    ]

    mockTasks.forEach((task) => {
      this.tasks.set(task.id, task)
    })
  }

  /**
   * Busca tarefa por ID
   * @param {string} id - ID da tarefa
   * @returns {Object|null}
   */
  findById(id) {
    return this.tasks.get(id) || null
  }

  /**
   * Lista tarefas de um usuário
   * @param {string} userId - ID do usuário
   * @param {Object} filters - Filtros opcionais
   * @returns {Array}
   */
  findByUserId(userId, filters = {}) {
    let userTasks = Array.from(this.tasks.values()).filter((task) => task.userId === userId)

    // Aplicar filtros
    if (filters.status) {
      userTasks = userTasks.filter((task) => task.status === filters.status)
    }

    if (filters.priority) {
      userTasks = userTasks.filter((task) => task.priority === filters.priority)
    }

    // Aplicar ordenação
    const sortBy = filters.sortBy || 'createdAt'
    const sortOrder = filters.sortOrder || 'desc'

    userTasks.sort((a, b) => {
      let comparison = 0

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title)
      } else if (sortBy === 'dueDate') {
        const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0)
        const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0)
        comparison = dateA - dateB
      } else {
        // createdAt ou updatedAt
        comparison = new Date(a[sortBy]) - new Date(b[sortBy])
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return userTasks
  }

  /**
   * Cria uma nova tarefa
   * @param {Object} taskData - Dados da tarefa
   * @returns {Object}
   */
  create(taskData) {
    const task = {
      id: taskData.id,
      userId: taskData.userId,
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'pending',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: taskData.createdAt || new Date().toISOString(),
      updatedAt: taskData.updatedAt || new Date().toISOString(),
    }

    this.tasks.set(task.id, task)
    return task
  }

  /**
   * Atualiza uma tarefa
   * @param {string} id - ID da tarefa
   * @param {Object} updates - Campos a atualizar
   * @returns {Object|null}
   */
  update(id, updates) {
    const task = this.tasks.get(id)
    if (!task) {
      return null
    }

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.tasks.set(id, updatedTask)
    return updatedTask
  }

  /**
   * Remove uma tarefa
   * @param {string} id - ID da tarefa
   * @returns {boolean}
   */
  delete(id) {
    return this.tasks.delete(id)
  }
}

module.exports = TaskRepository
