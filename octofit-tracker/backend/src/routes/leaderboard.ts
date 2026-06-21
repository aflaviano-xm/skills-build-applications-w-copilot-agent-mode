import { Router } from 'express'

import { LeaderboardEntry } from '../models/leaderboard'

const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const entries = await LeaderboardEntry.find().populate('user').sort({ rank: 1, score: -1 })
    response.json(entries)
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load leaderboard' })
  }
})

leaderboardRouter.post('/', async (request, response) => {
  try {
    const entry = await LeaderboardEntry.create(request.body)
    response.status(201).json(entry)
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create leaderboard entry' })
  }
})

export default leaderboardRouter