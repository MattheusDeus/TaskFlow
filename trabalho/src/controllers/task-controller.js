const TaskService = require('../services/task-service')

/**
 * Controller de Tarefas
 * Processa requisições HTTP relacionadas a tarefas
 */
class TaskController {
  constructor() {
    this.taskService = new TaskService()
  }

  /**
   * Cria uma nova tarefa
   * POST /api/users/:userId/tasks
   */
  async createTask(req, res, next) {
    try {
      const { userId } = req.params
      const task = this.taskService.createTask(userId, req.body)
      res.status(201).json({
        success: true,
        data: task,
        message: 'Tarefa criada com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Lista tarefas de um usuário
   * GET /api/users/:userId/tasks
   */
  async listTasks(req, res, next) {
    try {
      const { userId } = req.params
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      }

      // Remove filtros undefined
      Object.keys(filters).forEach((key) => {
        if (filters[key] === undefined) delete filters[key]
      })

      const tasks = this.taskService.listTasks(userId, filters)
      res.status(200).json({
        success: true,
        data: tasks,
        message: 'Tarefas listadas com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Busca tarefa por ID
   * GET /api/users/:userId/tasks/:taskId
   */
  async getTaskById(req, res, next) {
    try {
      const { userId, taskId } = req.params
      const task = this.taskService.getTaskById(taskId, userId)
      res.status(200).json({
        success: true,
        data: task,
        message: 'Tarefa encontrada',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Atualiza uma tarefa
   * PUT /api/users/:userId/tasks/:taskId
   */
  async updateTask(req, res, next) {
    try {
      const { userId, taskId } = req.params
      const task = this.taskService.updateTask(taskId, userId, req.body)
      res.status(200).json({
        success: true,
        data: task,
        message: 'Tarefa atualizada com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Remove uma tarefa
   * DELETE /api/users/:userId/tasks/:taskId
   */
  async deleteTask(req, res, next) {
    try {
      const { userId, taskId } = req.params
      this.taskService.deleteTask(taskId, userId)
      res.status(200).json({
        success: true,
        message: 'Tarefa removida com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController
