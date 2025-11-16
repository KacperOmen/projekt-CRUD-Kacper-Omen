import express from 'express'
import {register, login, logout, getMe} from '../controllers/auth.controller.js';
import {userAuth} from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/me', userAuth, getMe);

export default authRouter;