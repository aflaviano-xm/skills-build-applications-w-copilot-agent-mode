import { Schema, Types, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    recommendedFor: { type: Types.ObjectId, ref: 'User' },
    difficulty: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)