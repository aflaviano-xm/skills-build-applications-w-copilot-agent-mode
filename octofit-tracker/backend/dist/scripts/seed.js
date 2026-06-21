"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data.
// Seed command: npm --prefix octofit-tracker/backend run seed
const seedDatabase = async () => {
    try {
        await (0, database_1.connectDatabase)();
        await Promise.all([
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            team_1.Team.deleteMany({}),
            user_1.User.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
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
        ]);
        await team_1.Team.create({
            name: 'OctoFit Champions',
            members: users.map((user) => user._id),
        });
        await activity_1.Activity.insertMany([
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
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { user: users[0]._id, score: 950, rank: 1 },
            { user: users[1]._id, score: 875, rank: 2 },
        ]);
        await workout_1.Workout.insertMany([
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
        ]);
        console.log('OctoFit seed data inserted successfully');
    }
    catch (error) {
        console.error('Failed to seed OctoFit database', error);
        process.exitCode = 1;
    }
    finally {
        await (0, database_1.disconnectDatabase)();
    }
};
seedDatabase();
