const Task = require('../models/task')
const TaskRepository = require('../repositories/task-repository')
const UserRepository = require('../repositories/user-repository')

/**
 * Serviço de Tarefas
 * Implementa lógica de negócio relacionada a tarefas
 */
class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository()
    this.userRepository = new UserRepository()
  }

  /**
   * Cria uma nova tarefa
   * @param {string} userId - ID do usuário
   * @param {Object} taskData - Dados da tarefa
   * @returns {Promise<Object>}
   * @throws {Error} Se validação falhar ou usuário não existir
   */
  createTask(userId, taskData) {
    // Verificar se usuário existe
    const user = this.userRepository.findById(userId)
    if (!user) {
      const error = new Error('Usuário não encontrado')
      error.code = 'USER_NOT_FOUND'
      error.statusCode = 404
      throw error
    }

    // Criar tarefa
    const task = new Task({
      id: this.generateId(),
      userId,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'pending',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
    })

    // Validar
    const validation = task.validate()
    if (!validation.valid) {
      const error = new Error('Dados inválidos')
      error.code = 'VALIDATION_ERROR'
      error.statusCode = 400
      error.details = validation.errors
      throw error
    }

    // Salvar
    const savedTask = this.taskRepository.create(task.toJSON())
    return savedTask
  }

  /**
   * Lista tarefas de um usuário
   * @param {string} userId - ID do usuário
   * @param {Object} filters - Filtros opcionais
   * @returns {Promise<Array>}
   * @throws {Error} Se usuário não encontrado
   */
  listTasks(userId, filters = {}) {
    // Verificar se usuário existe
    const user = this.userRepository.findById(userId)
    if (!user) {
      const error = new Error('Usuário não encontrado')
      error.code = 'USER_NOT_FOUND'
      error.statusCode = 404
      throw error
    }

    return this.taskRepository.findByUserId(userId, filters)
  }

  /**
   * Busca tarefa por ID
   * @param {string} taskId - ID da tarefa
   * @param {string} userId - ID do usuário (opcional, para validação)
   * @returns {Promise<Object>}
   * @throws {Error} Se tarefa não encontrada ou não pertencer ao usuário
   */
  getTaskById(taskId, userId = null) {
    const task = this.taskRepository.findById(taskId)

    if (!task) {
      const error = new Error('Tarefa não encontrada')
      error.code = 'TASK_NOT_FOUND'
      error.statusCode = 404
      throw error
    }

    // Verificar propriedade se userId fornecido
    if (userId && task.userId !== userId) {
      const error = new Error('Tarefa não pertence ao usuário')
      error.code = 'FORBIDDEN'
      error.statusCode = 403
      throw error
    }

    return task
  }

  /**
   * Atualiza uma tarefa
   * @param {string} taskId - ID da tarefa
   * @param {string} userId - ID do usuário
   * @param {Object} updates - Campos a atualizar
   * @returns {Promise<Object>}
   * @throws {Error} Se tarefa não encontrada, não pertencer ao usuário ou validação falhar
   */
  updateTask(taskId, userId, updates) {
    // Buscar tarefa e validar propriedade
    const task = this.getTaskById(taskId, userId)

    // Criar objeto Task para validação
    const taskModel = new Task(task)

    // Validar transição de status se status está sendo atualizado
    if (updates.status && updates.status !== task.status) {
      const statusValidation = taskModel.validateStatusTransition(updates.status)
      if (!statusValidation.valid) {
        const error = new Error(statusValidation.error)
        error.code = 'INVALID_STATUS_TRANSITION'
        error.statusCode = 400
        throw error
      }
    }

    // Aplicar atualizações
    taskModel.update(updates)

    // Validar tarefa atualizada
    const validation = taskModel.validate()
    if (!validation.valid) {
      const error = new Error('Dados inválidos')
      error.code = 'VALIDATION_ERROR'
      error.statusCode = 400
      error.details = validation.errors
      throw error
    }

    // Atualizar no repositório
    const updatedTask = this.taskRepository.update(taskId, taskModel.toJSON())
    return updatedTask
  }

  /**
   * Remove uma tarefa
   * @param {string} taskId - ID da tarefa
   * @param {string} userId - ID do usuário
   * @returns {Promise<boolean>}
   * @throws {Error} Se tarefa não encontrada ou não pertencer ao usuário
   */
  deleteTask(taskId, userId) {
    // Buscar tarefa e validar propriedade
    this.getTaskById(taskId, userId)

    // Remover
    return this.taskRepository.delete(taskId)
  }

  /**
   * Gera ID único
   * @returns {string}
   */
  generateId() {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

module.exports = TaskService
