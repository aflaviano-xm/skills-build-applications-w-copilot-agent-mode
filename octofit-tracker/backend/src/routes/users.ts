import { Router } from 'express'

import { User } from '../models/user'

const usersRouter = Router()

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await User.find().sort({ username: 1 })
    response.json(users)
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load users' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body)
    response.status(201).json(user)
  } catch (error) {
    response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create user' })
  }
})

export default usersRouter