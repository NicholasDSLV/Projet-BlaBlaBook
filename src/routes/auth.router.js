import { Router } from 'express';
import  authController  from '../controllers/auth.controller.js';

const router = Router();
// router.get('/auth/register', authController.register);
// router.get('/auth/login', authController.login);
router.get('/auth/profile', authController.profile);


export default router;