import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.loginUser);

router.post('/refreshToken', AuthController.refreshToken);

router.post('/forgotPassword', AuthController.forgotPassword);

router.post('/resetPassword', AuthController.resetPassword);




export const AuthRoutes = router;