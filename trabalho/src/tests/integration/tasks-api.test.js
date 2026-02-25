const request = require('supertest')
const app = require('../../index')

describe('Tasks API', () => {
  const userId = 'user-1'

  describe('POST /api/users/:userId/tasks', () => {
    it('deve criar uma nova tarefa', async () => {
      const taskData = {
        title: 'Tarefa de teste',
        description: 'Descrição da tarefa de teste',
        priority: 'medium',
      }

      const response = await request(app)
        .post(`/api/users/${userId}/tasks`)
        .send(taskData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.title).toBe(taskData.title)
      expect(response.body.data.userId).toBe(userId)
    })

    it('deve retornar erro 400 para dados inválidos', async () => {
      const taskData = {
        title: 'AB', // Muito curto
      }

      const response = await request(app)
        .post(`/api/users/${userId}/tasks`)
        .send(taskData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error.code).toBe('VALIDATION_ERROR')
    })

    it('deve retornar erro 404 para usuário inexistente', async () => {
      const taskData = {
        title: 'Tarefa de teste',
      }

      const response = await request(app)
        .post('/api/users/user-invalid/tasks')
        .send(taskData)
        .expect(404)

      expect(response.body.success).toBe(false)
      expect(response.body.error.code).toBe('USER_NOT_FOUND')
    })
  })

  describe('GET /api/users/:userId/tasks', () => {
    it('deve listar tarefas do usuário', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}/tasks`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
      response.body.data.forEach((task) => {
        expect(task.userId).toBe(userId)
      })
    })

    it('deve filtrar tarefas por status', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}/tasks`)
        .query({ status: 'pending' })
        .expect(200)

      response.body.data.forEach((task) => {
        expect(task.status).toBe('pending')
      })
    })
  })

  describe('GET /api/users/:userId/tasks/:taskId', () => {
    it('deve retornar tarefa existente', async () => {
      const taskId = 'task-1'

      const response = await request(app)
        .get(`/api/users/${userId}/tasks/${taskId}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(taskId)
      expect(response.body.data.userId).toBe(userId)
    })

    it('deve retornar erro 404 para tarefa inexistente', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}/tasks/task-invalid`)
        .expect(404)

      expect(response.body.success).toBe(false)
      expect(response.body.error.code).toBe('TASK_NOT_FOUND')
    })
  })

  describe('PUT /api/users/:userId/tasks/:taskId', () => {
    it('deve atualizar tarefa existente', async () => {
      const taskId = 'task-1'
      const updates = {
        status: 'in_progress',
        priority: 'high',
      }

      const response = await request(app)
        .put(`/api/users/${userId}/tasks/${taskId}`)
        .send(updates)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.status).toBe('in_progress')
      expect(response.body.data.priority).toBe('high')
    })
  })

  describe('DELETE /api/users/:userId/tasks/:taskId', () => {
    it('deve remover tarefa existente', async () => {
      // Primeiro criar uma tarefa
      const createResponse = await request(app)
        .post(`/api/users/${userId}/tasks`)
        .send({
          title: 'Tarefa para deletar',
        })
        .expect(201)

      const taskId = createResponse.body.data.id

      // Depois deletar
      const deleteResponse = await request(app)
        .delete(`/api/users/${userId}/tasks/${taskId}`)
        .expect(200)

      expect(deleteResponse.body.success).toBe(true)

      // Verificar que foi removida
      await request(app)
        .get(`/api/users/${userId}/tasks/${taskId}`)
        .expect(404)
    })
  })
})
