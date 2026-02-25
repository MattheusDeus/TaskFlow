/**
 * Repositório de Usuários
 * Gerencia acesso a dados de usuários (mockado em memória)
 */
class UserRepository {
  constructor() {
    // Armazenamento em memória
    this.users = new Map()
    this.initMockData()
  }

  /**
   * Inicializa dados mockados
   */
  initMockData() {
    const mockUsers = [
      {
        id: 'user-1',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        createdAt: '2024-01-15T10:00:00.000Z',
      },
      {
        id: 'user-2',
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        createdAt: '2024-01-16T11:00:00.000Z',
      },
      {
        id: 'user-3',
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        createdAt: '2024-01-17T12:00:00.000Z',
      },
    ]

    mockUsers.forEach((user) => {
      this.users.set(user.id, user)
    })
  }

  /**
   * Busca usuário por ID
   * @param {string} id - ID do usuário
   * @returns {Object|null}
   */
  findById(id) {
    return this.users.get(id) || null
  }

  /**
   * Busca usuário por email
   * @param {string} email - Email do usuário
   * @returns {Object|null}
   */
  findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  /**
   * Lista todos os usuários
   * @returns {Array}
   */
  findAll() {
    return Array.from(this.users.values()).sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Object}
   */
  create(userData) {
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt || new Date().toISOString(),
    }

    this.users.set(user.id, user)
    return user
  }

  /**
   * Verifica se email já existe
   * @param {string} email - Email a verificar
   * @param {string} excludeUserId - ID de usuário a excluir da verificação
   * @returns {boolean}
   */
  emailExists(email, excludeUserId = null) {
    for (const user of this.users.values()) {
      if (user.email === email && user.id !== excludeUserId) {
        return true
      }
    }
    return false
  }
}

module.exports = UserRepository
