"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.render('Home');
});
router.get('/register', (req, res, next) => {
    res.render('Register');
});
router.get('/login', (req, res, next) => {
    res.render('Login');
});
router.get('/logout', (req, res, next) => {
    res.render('Home');
});
router.get('/note', (req, res, next) => {
    res.render('Notepad');
});
exports.default = router;
