"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAndNotes = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const toDoModel_1 = require("../model/toDoModel");
// import { TodoInstance } from "../model/toDoModel";
const jwtsecret = process.env.JWT_SECRET;
//========================USER API ===============================
// export const Register = async (req:Request, res:Response)=>{
// try{
//  const {email, firstName, password, confirm_password} = req.body
//  const iduuid = uuidv4()
// //Validate with Joi
// const validateResult =  UserRegisterSchema.validate(req.body, options);
// // console.log(validateResult)
// if(validateResult.error){
//   return res.status(400).json({Error:validateResult.error.details[0].message})
// }
// const passwordHash = await bcrypt.hash(password, 8)
// //Generate Salt
// //Create User
// const user = await UserInstance.findOne({
//   where: {email:email}
// })
// if(!user){
//   let newUser =  await UserInstance.create({
//       id: iduuid,
//       email,
//       firstName,
//       password: passwordHash
//     })
//     //Generate Token
//     const User = await UserInstance.findOne({
//         where: {email:email}
//     }) as unknown as {[key:string]: string}
//     const { id } = User
//     const token = jwt.sign({id},jwtsecret,{expiresIn:"45mins"})
//     // res.cookie('token', token, {httpOnly:true, maxAge: 30*60*1000})
//     return res.status(201).json({
//       msg: "User created successfully",
//       newUser,
//       token
//     })
//     // return res.render("Login")
// }
// res.status(409).json({
//   error: "User already exists"
// })
// }catch(err){
//     console.log(err)
// }
// }
// export const Login = async (req:Request, res:Response) =>{
//     try {
//         const {email, password} = req.body
//         // console.log('Save')
// //Validate with Joi
// const validateResult =  UserLoginSchema.validate(req.body, options);
// // console.log(validateResult)
// if(validateResult.error){
//   return res.status(400).json({Error:validateResult.error.details[0].message})
// }
// const User = await UserInstance.findOne({
//     where: {email:email}
// }) as unknown as {[key:string]: string}
// const { id } = User
// const token = jwt.sign({id},jwtsecret,{expiresIn:"45d"})
// // res.cookie('token', token, {httpOnly:true, maxAge: 45*24*60*60*1000})
// const validUser = await bcrypt.compare(password, User.password)
// if(validUser){
//     return res.status(201).json({
//         msg: "User logged in successfully",
//         User,
//         token
//       })
// }
// return res.status(400).json({
//     Error: "Invalid email or password"
//   })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({Error:"Internal Server Error"})
//     }
// }
// export const getUserAndNotes = async(req:Request, res:Response)=>{
//   try {
//     // const limit = req.query?.limit as number | undefined;
//     // const offset = req.query?.offset as number | undefined;
//     const getAllUser = await UserInstance.findAndCountAll(
//       {
//       include:[
//         {
//           model: TodoInstance,
//           as: "todo"
//         }
//       ]
//     }
//     )
//   return res.status(200).json({
//     msg: "User Details Retrieved",
//     count: getAllUser.count,
//     users:getAllUser.rows
//   })
//   } catch (error) {
//     console.log(error)
//   }
// }
// ==========================EJS API============================
const Register = async (req, res) => {
    try {
        const { email, firstName, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //Validate with Joi
        const validateResult = utils_1.UserRegisterSchema.validate(req.body, utils_1.options);
        // console.log(validateResult)
        if (validateResult.error) {
            // return res.status(400).json({Error:validateResult.error.details[0].message})
            res.render("Register", { error: validateResult.error.details[0].message });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        //Generate Salt
        //Create User
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email }
        });
        if (!user) {
            let newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                email,
                firstName,
                password: passwordHash
            });
            //Generate Token
            const User = await userModel_1.UserInstance.findOne({
                where: { email: email }
            });
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "45mins" });
            // res.cookie('token', token, {httpOnly:true, maxAge: 30*60*1000})
            // return res.status(201).json({
            //   msg: "User created successfully",
            //   newUser,
            //   token
            // })
            res.redirect("/login");
            // return res.render("Login")
        }
        // res.status(409).json({
        //   error: "User already exists"
        // })
        res.render("Register", { error: "User already exists" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log('Save')
        //Validate with Joi
        const validateResult = utils_1.UserLoginSchema.validate(req.body, utils_1.options);
        // console.log(validateResult)
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const User = await userModel_1.UserInstance.findOne({
            where: { email: email }
        });
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "45d" });
        // res.cookie('token', token, {httpOnly:true, maxAge: 45*24*60*60*1000})
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            return res.status(201).json({
                msg: "User logged in successfully",
                User,
                token
            });
        }
        return res.status(400).json({
            Error: "Invalid email or password"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.Login = Login;
const getUserAndNotes = async (req, res) => {
    try {
        // const limit = req.query?.limit as number | undefined;
        // const offset = req.query?.offset as number | undefined;
        const getAllUser = await userModel_1.UserInstance.findAndCountAll({
            include: [
                {
                    model: toDoModel_1.TodoInstance,
                    as: "todo"
                }
            ]
        });
        return res.status(200).json({
            msg: "User Details Retrieved",
            count: getAllUser.count,
            users: getAllUser.rows
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserAndNotes = getUserAndNotes;
