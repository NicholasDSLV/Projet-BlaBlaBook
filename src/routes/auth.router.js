import { Router } from 'express';
import  authController  from '../controllers/auth.controller.js';
import { validateUser } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/auth/register', authController.showRegister);
router.get('/auth/login', validateUser, authController.showlogin);
router.get('/auth/profile', authController.profile);
router.post("/auth/register", validateUser, authController.registerUser);
router.post('/auth/login', validateUser, authController.login)


export default router;