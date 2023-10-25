import express from'express';
const router = express.Router();
import { CreateTodo, getNote, updateNote, deleteNote } from '../controller/toDoController';
import { auth } from '../middlewares/auth';

/* GET home page. */
router.post('/create', auth ,CreateTodo )
router.get('/get-notes',auth, getNote )
router.patch('/update-note/:id',auth, updateNote)
router.delete('/delete-note/:id',auth, deleteNote)

export default router;
