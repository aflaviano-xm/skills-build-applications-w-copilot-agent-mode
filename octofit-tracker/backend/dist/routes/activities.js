"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_request, response) => {
    try {
        const activities = await activity_1.Activity.find().populate('user').sort({ createdAt: -1 });
        response.json(activities);
    }
    catch (error) {
        response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load activities' });
    }
});
activitiesRouter.post('/', async (request, response) => {
    try {
        const activity = await activity_1.Activity.create(request.body);
        response.status(201).json(activity);
    }
    catch (error) {
        response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create activity' });
    }
});
exports.default = activitiesRouter;
