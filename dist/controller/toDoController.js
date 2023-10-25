"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.CreateTodo = void 0;
const uuid_1 = require("uuid");
const toDoModel_1 = require("../model/toDoModel");
const utils_1 = require("../utils/utils");
const CreateTodo = async (req, res) => {
    try {
        const verified = req.user;
        console.log(verified);
        const id = (0, uuid_1.v4)();
        const { task, details, status, userID } = req.body;
        const toDoRecord = await toDoModel_1.TodoInstance.create({
            id,
            task,
            details,
            status,
            userID: verified.id
        });
        return res.status(201).json({
            msg: "New Task Added",
            toDoRecord
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.CreateTodo = CreateTodo;
const getNote = async (req, res) => {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const getAllNotes = await toDoModel_1.TodoInstance.findAndCountAll({
            limit: limit,
            offset: offset
        });
        return res.status(200).json({
            msg: "All notes retrieved",
            count: getAllNotes.count,
            notes: getAllNotes.rows
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getNote = getNote;
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { details } = req.body;
        const validateResult = utils_1.updateNoteSchema.validate(req.body, utils_1.options);
        // console.log(validateResult)
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const updateNote = await toDoModel_1.TodoInstance.findOne({ where: { id } });
        if (!updateNote) {
            return res.status(400).json({
                error: "Note not found",
            });
        }
        const updatedNote = await updateNote.update({
            details
        });
        res.status(200).json({
            msg: "Successfully updated",
            updatedNote
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const validateResult = utils_1.updateNoteSchema.validate(req.body, utils_1.options);
        // console.log(validateResult)
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const deleteNote = await toDoModel_1.TodoInstance.findOne({ where: { id } });
        if (!deleteNote) {
            return res.status(400).json({
                error: "Note not found",
            });
        }
        const deletedNote = await deleteNote.destroy();
        res.status(200).json({
            msg: "Successfully deleted",
            deletedNote
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteNote = deleteNote;
