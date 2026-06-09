import express from 'express'
import mongoose from 'mongoose'

import { BASE_URL, MONGODB_URI, PORT } from './env'
import './models/activity'
import './models/leaderboard'
import './models/team'
import './models/user'
import './models/workout'
import healthRouter from './routes/health'

const app = express()

app.use(express.json())
app.use('/api', healthRouter)

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on ${BASE_URL}`)
    })
  } catch (error) {
    console.error('Failed to start OctoFit backend', error)
    process.exit(1)
  }
}

startServer()