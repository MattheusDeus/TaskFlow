/**
 * Middleware de tratamento de erros
 * Formata erros para resposta HTTP consistente
 */
function errorHandler(err, req, res, next) {
  // Log do erro (em produção, usar logger apropriado)
  console.error('Error:', {
    message: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })

  // Determinar status code
  const statusCode = err.statusCode || 500

  // Formatar resposta de erro
  const errorResponse = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Erro interno do servidor',
    },
  }

  // Adicionar detalhes se for erro de validação
  if (err.details) {
    errorResponse.error.details = err.details
  }

  // Não expor detalhes internos em produção
  if (statusCode === 500 && process.env.NODE_ENV !== 'development') {
    errorResponse.error.message = 'Erro interno do servidor'
  }

  res.status(statusCode).json(errorResponse)
}

module.exports = errorHandler
