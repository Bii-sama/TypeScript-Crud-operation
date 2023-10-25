import { DataTypes, Model } from "sequelize";
import { validate } from "uuid";
import db from "../config/database.config";
import { TodoInstance } from "./toDoModel";

export interface Userdetails{
    id: string,
    email: string,
    firstName: string,
    password: string
}

export class UserInstance extends Model<Userdetails> {}

UserInstance.init({
    id:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        // validate:{
        //     notNull:{
        //         msg: "Password is required"
        //     }
        // }
    }
},{
    sequelize: db,
    tableName: "user"
})

UserInstance.hasMany(TodoInstance, {foreignKey: "userID", as: "todo"})
TodoInstance.belongsTo(UserInstance, {foreignKey: "userID", as: "user"}) 