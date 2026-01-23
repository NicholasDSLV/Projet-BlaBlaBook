import { Router } from 'express';
import  bookController  from '../controllers/book.controller.js';

const router = Router();
router.get('/books', bookController.getAll);
router.get('/books/:id', bookController.getById);



export default router;