import { Router } from 'express'
import mongoose from 'mongoose'

const healthRouter = Router()

healthRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    baseUrl: process.env.CODESPACE_NAME
      ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000',
    mongoState: mongoose.connection.readyState,
  })
})

export default healthRouter