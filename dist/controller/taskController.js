"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const toDoModel_1 = require("../model/toDoModel");
const uuid_1 = require("uuid");
const Register = async (req, res) => {
    try {
        const { task, details } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //Validate with Joi
        //Generate Salt
        //Create User
        const user = await toDoModel_1.UserInstance.findOne({
            where: { task: task }
        });
        if (!task) {
            let newTask = await toDoModel_1.UserInstance.create({
                id: iduuid,
                task,
                details
            });
            return res.status(201).json({
                msg: "New Task Added Successfully",
                newTask
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
