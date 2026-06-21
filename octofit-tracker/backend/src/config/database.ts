import mongoose from 'mongoose'

import { MONGODB_URI } from '../env'

export const connectDatabase = async () => {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to octofit_db with mongoose')
}

export const disconnectDatabase = async () => {
  await mongoose.disconnect()
}