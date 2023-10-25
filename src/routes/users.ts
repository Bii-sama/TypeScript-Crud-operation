import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import { getUserAndNotes, Login, Register } from '../controller/userController';

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login)
router.get('/get-user', getUserAndNotes)

export default router;
