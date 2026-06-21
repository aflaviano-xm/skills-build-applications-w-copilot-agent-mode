import { Router } from 'express'

import { Activity } from '../models/activity'

const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await Activity.find().populate('user').sort({ createdAt: -1 })
    response.json(activities)
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load activities' })
  }
})

activitiesRouter.post('/', async (request, response) => {
  try {
    const activity = await Activity.create(request.body)
    response.status(201).json(activity)
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create activity' })
  }
})

export default activitiesRouter