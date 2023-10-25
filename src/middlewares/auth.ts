import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { where } from "sequelize";
import { UserInstance } from "../model/userModel";
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(req:Request| any, res:Response, next:NextFunction){
    try {
        const authorization = req.headers.authorization
        // const authorization = req.cookies.jwt

        if(!authorization){
            return res.status(401).json({
                Error: "Please Log In"
            })
        }

        const token = authorization.slice(7, authorization.length)

        let verified = jwt.verify(token, jwtsecret)

        if(!verified){
            return res.status(401).json({
                Error: "Token is Invalid. You cannot access this route"
            })
        }

    const { id } = verified as {[key:string]: string}

    const user = await UserInstance.findOne({where: {id}})

    if (!user){
        return res.status(401).json({
            Error: "User not verified, kindly check your email"
        })
    }

    req.user = verified
    next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            Error: "User Not Logged In"
        })
    }
}