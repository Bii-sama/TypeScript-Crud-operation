"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const toDoModel_1 = require("./toDoModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // validate:{
        //     notNull:{
        //         msg: "Password is required"
        //     }
        // }
    }
}, {
    sequelize: database_config_1.default,
    tableName: "user"
});
UserInstance.hasMany(toDoModel_1.TodoInstance, { foreignKey: "userID", as: "todo" });
toDoModel_1.TodoInstance.belongsTo(UserInstance, { foreignKey: "userID", as: "user" });
