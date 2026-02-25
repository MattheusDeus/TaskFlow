const express = require('express')
const UserController = require('./controllers/user-controller')
const TaskController = require('./controllers/task-controller')

const router = express.Router()
const userController = new UserController()
const taskController = new TaskController()

// Rotas de usuários
router.post('/users', (req, res, next) => userController.createUser(req, res, next))
router.get('/users', (req, res, next) => userController.listUsers(req, res, next))
router.get('/users/:userId', (req, res, next) => userController.getUserById(req, res, next))

// Rotas de tarefas
router.post('/users/:userId/tasks', (req, res, next) => taskController.createTask(req, res, next))
router.get('/users/:userId/tasks', (req, res, next) => taskController.listTasks(req, res, next))
router.get('/users/:userId/tasks/:taskId', (req, res, next) =>
  taskController.getTaskById(req, res, next)
)
router.put('/users/:userId/tasks/:taskId', (req, res, next) =>
  taskController.updateTask(req, res, next)
)
router.delete('/users/:userId/tasks/:taskId', (req, res, next) =>
  taskController.deleteTask(req, res, next)
)

module.exports = router
