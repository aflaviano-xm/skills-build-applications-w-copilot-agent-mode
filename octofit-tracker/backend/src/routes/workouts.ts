import { Router } from 'express'

import { Workout } from '../models/workout'

const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find().populate('recommendedFor').sort({ title: 1 })
    response.json(workouts)
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load workouts' })
  }
})

workoutsRouter.post('/', async (request, response) => {
  try {
    const workout = await Workout.create(request.body)
    response.status(201).json(workout)
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create workout' })
  }
})

export default workoutsRouter