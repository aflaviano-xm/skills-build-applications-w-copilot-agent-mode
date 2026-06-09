"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
require("./models/activity");
require("./models/leaderboard");
require("./models/team");
require("./models/user");
require("./models/workout");
const health_1 = __importDefault(require("./routes/health"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', health_1.default);
const startServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.MONGODB_URI);
        app.listen(env_1.PORT, () => {
            console.log(`OctoFit backend listening on ${env_1.BASE_URL}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
};
startServer();
