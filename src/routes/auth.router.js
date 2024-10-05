import express from 'express';
import { login, loginFaceBook, register, extendToken} from '../controllers/auth.controller.js';
const authRouter =express.Router();

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/login-face",loginFaceBook);
authRouter.post("/extend-token",extendToken)
export default authRouter;