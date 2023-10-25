"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('app', '', '', {
    storage: './notes.sqlite',
    dialect: 'sqlite',
    logging: true
});
exports.default = db;
