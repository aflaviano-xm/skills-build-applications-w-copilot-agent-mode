import express from 'express'
import mongoose from 'mongoose'

import { BASE_URL, MONGODB_URI, PORT } from './env'
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

app.use(express.json())
app.use('/api', healthRouter)
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

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