"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const healthRouter = (0, express_1.Router)();
healthRouter.get('/health', (_request, response) => {
    response.json({
        status: 'ok',
        baseUrl: process.env.CODESPACE_NAME
            ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
            : 'http://localhost:8000',
        mongoState: mongoose_1.default.connection.readyState,
    });
});
exports.default = healthRouter;
