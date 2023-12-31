import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

router.get('/', (req:Request, res:Response, next:NextFunction)=>{
   res.render('Home')
})

router.get('/register', (req:Request, res:Response, next:NextFunction)=>{
    res.render('Register')
 })


 router.get('/login', (req:Request, res:Response, next:NextFunction)=>{
    res.render('Login')
 })

 router.get('/logout', (req:Request, res:Response, next:NextFunction)=>{
    res.render('Home')
 })

 router.get('/note', (req:Request, res:Response, next:NextFunction)=>{
   res.render('Notepad')
})

export default router