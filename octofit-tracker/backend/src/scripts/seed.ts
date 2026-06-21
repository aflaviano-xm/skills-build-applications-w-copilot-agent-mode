import { connectDatabase, disconnectDatabase } from '../config/database'
import { Activity } from '../models/activity'
import { LeaderboardEntry } from '../models/leaderboard'
import { Team } from '../models/team'
import { User } from '../models/user'
import { Workout } from '../models/workout'

// Seed the octofit_db database with test data.
// Seed command: npm --prefix octofit-tracker/backend run seed
const seedDatabase = async () => {
  try {
    await connectDatabase()

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        username: 'octocat',
        email: 'octocat@example.com',
        profileImageUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
      },
      {
        username: 'monalisa',
        email: 'monalisa@example.com',
        profileImageUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      },
    ])

    await Team.create({
      name: 'OctoFit Champions',
      members: users.map((user) => user._id),
    })

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 320,
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 410,
      },
    ])

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, score: 950, rank: 1 },
      { user: users[1]._id, score: 875, rank: 2 },
    ])

    await Workout.insertMany([
      {
        title: 'Beginner Cardio Blast',
        recommendedFor: users[0]._id,
        difficulty: 'Beginner',
      },
      {
        title: 'Intermediate Strength Circuit',
        recommendedFor: users[1]._id,
        difficulty: 'Intermediate',
      },
    ])

    console.log('OctoFit seed data inserted successfully')
  } catch (error) {
    console.error('Failed to seed OctoFit database', error)
    process.exitCode = 1
  } finally {
    await disconnectDatabase()
  }
}

seedDatabase()