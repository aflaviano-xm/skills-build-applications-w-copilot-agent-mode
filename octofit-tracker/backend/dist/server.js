"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const env_1 = require("./env");
require("./models/activity");
require("./models/leaderboard");
require("./models/team");
require("./models/user");
require("./models/workout");
const activities_1 = __importDefault(require("./routes/activities"));
const health_1 = __importDefault(require("./routes/health"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
exports.app = app;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${env_1.PORT}`;
exports.apiBaseUrl = apiBaseUrl;
app.use(express_1.default.json());
app.use('/api', health_1.default);
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(env_1.PORT, () => {
            console.log(`OctoFit backend listening on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
};
startServer();
