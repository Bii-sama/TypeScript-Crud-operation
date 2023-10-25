"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const toDoController_1 = require("../controller/toDoController");
const auth_1 = require("../middlewares/auth");
/* GET home page. */
router.post('/create', auth_1.auth, toDoController_1.CreateTodo);
router.get('/get-notes', auth_1.auth, toDoController_1.getNote);
router.patch('/update-note/:id', auth_1.auth, toDoController_1.updateNote);
router.delete('/delete-note/:id', auth_1.auth, toDoController_1.deleteNote);
exports.default = router;
