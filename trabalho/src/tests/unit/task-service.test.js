const TaskService = require('../../services/task-service')
const UserRepository = require('../../repositories/user-repository')

describe('TaskService', () => {
  let taskService
  let userRepository

  beforeEach(() => {
    taskService = new TaskService()
    userRepository = new UserRepository()
  })

  describe('createTask', () => {
    it('deve criar uma tarefa válida', () => {
      const userId = 'user-1'
      const taskData = {
        title: 'Nova tarefa',
        description: 'Descrição da tarefa',
        priority: 'high',
      }

      const task = taskService.createTask(userId, taskData)

      expect(task).toBeDefined()
      expect(task.title).toBe(taskData.title)
      expect(task.userId).toBe(userId)
      expect(task.status).toBe('pending')
      expect(task.priority).toBe('high')
    })

    it('deve lançar erro para usuário inexistente', () => {
      const userId = 'user-invalid'
      const taskData = {
        title: 'Nova tarefa',
      }

      expect(() => {
        taskService.createTask(userId, taskData)
      }).toThrow('Usuário não encontrado')
    })

    it('deve lançar erro para dados inválidos', () => {
      const userId = 'user-1'
      const taskData = {
        title: 'AB', // Muito curto
      }

      expect(() => {
        taskService.createTask(userId, taskData)
      }).toThrow('Dados inválidos')
    })
  })

  describe('listTasks', () => {
    it('deve listar tarefas de um usuário', () => {
      const userId = 'user-1'
      const tasks = taskService.listTasks(userId)

      expect(Array.isArray(tasks)).toBe(true)
      tasks.forEach((task) => {
        expect(task.userId).toBe(userId)
      })
    })

    it('deve filtrar tarefas por status', () => {
      const userId = 'user-1'
      const tasks = taskService.listTasks(userId, { status: 'pending' })

      tasks.forEach((task) => {
        expect(task.status).toBe('pending')
      })
    })
  })

  describe('getTaskById', () => {
    it('deve retornar tarefa existente', () => {
      const taskId = 'task-1'
      const task = taskService.getTaskById(taskId)

      expect(task).toBeDefined()
      expect(task.id).toBe(taskId)
    })

    it('deve lançar erro para tarefa inexistente', () => {
      const taskId = 'task-invalid'

      expect(() => {
        taskService.getTaskById(taskId)
      }).toThrow('Tarefa não encontrada')
    })
  })

  describe('updateTask', () => {
    it('deve atualizar tarefa válida', () => {
      const taskId = 'task-1'
      const userId = 'user-1'
      const updates = {
        status: 'in_progress',
        priority: 'high',
      }

      const updatedTask = taskService.updateTask(taskId, userId, updates)

      expect(updatedTask.status).toBe('in_progress')
      expect(updatedTask.priority).toBe('high')
    })

    it('deve validar transição de status', () => {
      const taskId = 'task-1'
      const userId = 'user-1'

      // Primeiro, marcar como completed
      taskService.updateTask(taskId, userId, { status: 'completed' })

      // Tentar voltar para pending (inválido)
      expect(() => {
        taskService.updateTask(taskId, userId, { status: 'pending' })
      }).toThrow()
    })
  })

  describe('deleteTask', () => {
    it('deve remover tarefa existente', () => {
      // Criar uma nova tarefa para deletar
      const userId = 'user-1'
      const taskData = {
        title: 'Tarefa para deletar',
      }
      const task = taskService.createTask(userId, taskData)

      const result = taskService.deleteTask(task.id, userId)
      expect(result).toBe(true)

      // Verificar que foi removida
      expect(() => {
        taskService.getTaskById(task.id)
      }).toThrow('Tarefa não encontrada')
    })
  })
})
