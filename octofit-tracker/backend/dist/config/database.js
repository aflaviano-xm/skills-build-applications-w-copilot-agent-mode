"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../env");
const connectDatabase = async () => {
    await mongoose_1.default.connect(env_1.MONGODB_URI);
    console.log('Connected to octofit_db with mongoose');
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.disconnect();
};
exports.disconnectDatabase = disconnectDatabase;
