const UserService = require('../services/user-service')

/**
 * Controller de Usuários
 * Processa requisições HTTP relacionadas a usuários
 */
class UserController {
  constructor() {
    this.userService = new UserService()
  }

  /**
   * Cria um novo usuário
   * POST /api/users
   */
  async createUser(req, res, next) {
    try {
      const user = this.userService.createUser(req.body)
      res.status(201).json({
        success: true,
        data: user,
        message: 'Usuário criado com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Lista todos os usuários
   * GET /api/users
   */
  async listUsers(req, res, next) {
    try {
      const users = this.userService.listUsers()
      res.status(200).json({
        success: true,
        data: users,
        message: 'Usuários listados com sucesso',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Busca usuário por ID
   * GET /api/users/:userId
   */
  async getUserById(req, res, next) {
    try {
      const { userId } = req.params
      const user = this.userService.getUserById(userId)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Usuário encontrado',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
