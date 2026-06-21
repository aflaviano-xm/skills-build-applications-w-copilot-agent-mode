"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_request, response) => {
    try {
        const entries = await leaderboard_1.LeaderboardEntry.find().populate('user').sort({ rank: 1, score: -1 });
        response.json(entries);
    }
    catch (error) {
        response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load leaderboard' });
    }
});
leaderboardRouter.post('/', async (request, response) => {
    try {
        const entry = await leaderboard_1.LeaderboardEntry.create(request.body);
        response.status(201).json(entry);
    }
    catch (error) {
        response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create leaderboard entry' });
    }
});
exports.default = leaderboardRouter;
