const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API está funcionando',
    timestamp: new Date().toISOString(),
  })
})

// Rotas da API
app.use('/api', routes)

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📝 API disponível em http://localhost:${PORT}/api`)
  console.log(`💚 Health check em http://localhost:${PORT}/health`)
})

module.exports = app
