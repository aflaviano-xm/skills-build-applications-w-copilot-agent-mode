"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_request, response) => {
    try {
        const teams = await team_1.Team.find().populate('members').sort({ name: 1 });
        response.json(teams);
    }
    catch (error) {
        response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load teams' });
    }
});
teamsRouter.post('/', async (request, response) => {
    try {
        const team = await team_1.Team.create(request.body);
        response.status(201).json(team);
    }
    catch (error) {
        response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create team' });
    }
});
exports.default = teamsRouter;
