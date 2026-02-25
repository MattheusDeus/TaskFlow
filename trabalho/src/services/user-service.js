const User = require('../models/user')
const UserRepository = require('../repositories/user-repository')

/**
 * Serviço de Usuários
 * Implementa lógica de negócio relacionada a usuários
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>}
   * @throws {Error} Se validação falhar ou email já existir
   */
  createUser(userData) {
    // Verificar se email já existe
    if (this.userRepository.emailExists(userData.email)) {
      const error = new Error('Email já cadastrado')
      error.code = 'EMAIL_EXISTS'
      error.statusCode = 400
      throw error
    }

    // Criar usuário
    const user = new User({
      id: this.generateId(),
      name: userData.name,
      email: userData.email,
    })

    // Validar
    const validation = user.validate()
    if (!validation.valid) {
      const error = new Error('Dados inválidos')
      error.code = 'VALIDATION_ERROR'
      error.statusCode = 400
      error.details = validation.errors
      throw error
    }

    // Salvar
    const savedUser = this.userRepository.create(user.toJSON())
    return savedUser
  }

  /**
   * Lista todos os usuários
   * @returns {Promise<Array>}
   */
  listUsers() {
    return this.userRepository.findAll()
  }

  /**
   * Busca usuário por ID
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object>}
   * @throws {Error} Se usuário não encontrado
   */
  getUserById(userId) {
    const user = this.userRepository.findById(userId)

    if (!user) {
      const error = new Error('Usuário não encontrado')
      error.code = 'USER_NOT_FOUND'
      error.statusCode = 404
      throw error
    }

    return user
  }

  /**
   * Gera ID único
   * @returns {string}
   */
  generateId() {
    // Fallback simples se crypto.webcrypto não estiver disponível
    try {
      return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    } catch (e) {
      return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }
}

module.exports = UserService
