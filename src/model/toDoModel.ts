import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export interface ToDodetails{
    id: string,
    task: string,
    details: string,
    status: boolean,
    userID: string
}

export class TodoInstance extends Model<ToDodetails> {}

TodoInstance.init({
    id:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    task:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    details:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userID:{
        type: DataTypes.UUIDV4,
        allowNull: false
    }

},{
    sequelize: db,
    tableName: "todo"
})