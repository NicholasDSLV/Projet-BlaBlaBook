import { Router } from 'express';
import  authController  from '../controllers/auth.controller.js';
import { validateUser, validateLoginUser, loginMiddleware} from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/auth/register', authController.showRegister);
router.get('/auth/login', validateUser, authController.showlogin);
router.get('/auth/logout', authController.logout);
router.get('/auth/profile', loginMiddleware, authController.profile);
router.post("/auth/register", validateUser, authController.registerUser);
router.post('/auth/login', validateLoginUser, authController.login)


export default router;