"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_request, response) => {
    try {
        const workouts = await workout_1.Workout.find().populate('recommendedFor').sort({ title: 1 });
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load workouts' });
    }
});
workoutsRouter.post('/', async (request, response) => {
    try {
        const workout = await workout_1.Workout.create(request.body);
        response.status(201).json(workout);
    }
    catch (error) {
        response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create workout' });
    }
});
exports.default = workoutsRouter;
