"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_request, response) => {
    try {
        const users = await user_1.User.find().sort({ username: 1 });
        response.json(users);
    }
    catch (error) {
        response.status(500).json({ message: error instanceof Error ? error.message : 'Unable to load users' });
    }
});
usersRouter.post('/', async (request, response) => {
    try {
        const user = await user_1.User.create(request.body);
        response.status(201).json(user);
    }
    catch (error) {
        response.status(400).json({ message: error instanceof Error ? error.message : 'Unable to create user' });
    }
});
exports.default = usersRouter;
