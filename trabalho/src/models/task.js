/**
 * Modelo de Tarefa
 */
class Task {
  constructor({
    id,
    userId,
    title,
    description = '',
    status = 'pending',
    priority = 'medium',
    dueDate = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id
    this.userId = userId
    this.title = title
    this.description = description
    this.status = status
    this.priority = priority
    this.dueDate = dueDate
    this.createdAt = createdAt || new Date().toISOString()
    this.updatedAt = updatedAt || new Date().toISOString()
  }

  /**
   * Valida se a tarefa é válida
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validate() {
    const errors = []

    if (!this.title || this.title.trim().length < 3 || this.title.trim().length > 100) {
      errors.push('Título deve ter entre 3 e 100 caracteres')
    }

    if (this.description && this.description.length > 500) {
      errors.push('Descrição deve ter no máximo 500 caracteres')
    }

    if (!['pending', 'in_progress', 'completed'].includes(this.status)) {
      errors.push('Status deve ser: pending, in_progress ou completed')
    }

    if (!['low', 'medium', 'high'].includes(this.priority)) {
      errors.push('Prioridade deve ser: low, medium ou high')
    }

    if (this.dueDate && !this.isValidDate(this.dueDate)) {
      errors.push('Data de vencimento deve ser uma data válida')
    }

    if (this.dueDate && this.isPastDate(this.dueDate)) {
      errors.push('Data de vencimento deve ser hoje ou no futuro')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Valida formato de data
   * @param {string} date - Data a validar
   * @returns {boolean}
   */
  isValidDate(date) {
    const dateObj = new Date(date)
    return dateObj instanceof Date && !Number.isNaN(dateObj.getTime())
  }

  /**
   * Verifica se data é no passado
   * @param {string} date - Data a verificar
   * @returns {boolean}
   */
  isPastDate(date) {
    const dateObj = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    dateObj.setHours(0, 0, 0, 0)
    return dateObj < today
  }

  /**
   * Valida transição de status
   * @param {string} newStatus - Novo status
   * @returns {Object} { valid: boolean, error: string }
   */
  validateStatusTransition(newStatus) {
    const validTransitions = {
      pending: ['in_progress', 'completed'],
      in_progress: ['pending', 'completed'],
      completed: [],
    }

    if (!validTransitions[this.status]) {
      return { valid: false, error: 'Status atual inválido' }
    }

    if (!validTransitions[this.status].includes(newStatus)) {
      return {
        valid: false,
        error: `Não é possível transicionar de ${this.status} para ${newStatus}`,
      }
    }

    return { valid: true }
  }

  /**
   * Atualiza campos da tarefa
   * @param {Object} updates - Campos a atualizar
   */
  update(updates) {
    if (updates.title !== undefined) this.title = updates.title
    if (updates.description !== undefined) this.description = updates.description
    if (updates.status !== undefined) this.status = updates.status
    if (updates.priority !== undefined) this.priority = updates.priority
    if (updates.dueDate !== undefined) this.dueDate = updates.dueDate
    this.updatedAt = new Date().toISOString()
  }

  /**
   * Converte para objeto JSON
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

module.exports = Task
