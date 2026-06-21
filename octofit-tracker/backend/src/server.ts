import express from 'express'

import { connectDatabase } from './config/database'
import { PORT } from './env'
import './models/activity'
import './models/leaderboard'
import './models/team'
import './models/user'
import './models/workout'
import activitiesRouter from './routes/activities'
import healthRouter from './routes/health'
import leaderboardRouter from './routes/leaderboard'
import teamsRouter from './routes/teams'
import usersRouter from './routes/users'
import workoutsRouter from './routes/workouts'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`

app.use(express.json())
app.use('/api', healthRouter)
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

const startServer = async () => {
  try {
    await connectDatabase()
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on ${apiBaseUrl}`)
    })
  } catch (error) {
    console.error('Failed to start OctoFit backend', error)
    process.exit(1)
  }
}

startServer()

export { app, apiBaseUrl }