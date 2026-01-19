import { Router } from 'express';
import { bookController } from '../controllers/appController.js';

const bookRouter = Router();

bookRouter.get('/book', bookController.index);

export { bookRouter };