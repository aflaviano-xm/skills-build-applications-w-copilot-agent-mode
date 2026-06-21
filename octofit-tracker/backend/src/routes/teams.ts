import { Router } from 'express'

import { Team } from '../models/team'

const teamsRouter = Router()

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await Team.find().populate('members').sort({ name: 1 })
    response.json(teams)
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load teams' })
  }
})

teamsRouter.post('/', async (request, response) => {
  try {
    const team = await Team.create(request.body)
    response.status(201).json(team)
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create team' })
  }
})

export default teamsRouter