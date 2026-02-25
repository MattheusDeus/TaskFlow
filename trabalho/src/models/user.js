/**
 * Modelo de Usuário
 */
class User {
  constructor({ id, name, email, createdAt }) {
    this.id = id
    this.name = name
    this.email = email
    this.createdAt = createdAt || new Date().toISOString()
  }

  /**
   * Valida se o usuário é válido
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validate() {
    const errors = []

    if (!this.name || this.name.trim().length < 2 || this.name.trim().length > 100) {
      errors.push('Nome deve ter entre 2 e 100 caracteres')
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Email deve ter formato válido')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Valida formato de email
   * @param {string} email - Email a validar
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Converte para objeto JSON
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    }
  }
}

module.exports = User
