import { Router } from 'express';
import  authController  from '../controllers/auth.controller.js';

const router = Router();
 router.get('/auth/register', authController.showRegister);
 router.get('/auth/login', authController.showlogin);
router.get('/auth/profile', authController.profile);


export default router;