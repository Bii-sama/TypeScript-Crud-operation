"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        // const authorization = req.cookies.jwt
        if (!authorization) {
            return res.status(401).json({
                Error: "Please Log In"
            });
        }
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!verified) {
            return res.status(401).json({
                Error: "Token is Invalid. You cannot access this route"
            });
        }
        const { id } = verified;
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(401).json({
                Error: "User not verified, kindly check your email"
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            Error: "User Not Logged In"
        });
    }
}
exports.auth = auth;
