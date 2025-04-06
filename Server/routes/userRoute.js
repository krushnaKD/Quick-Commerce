import { Router } from "express";
import { loginUser, logoutuser, registerUserController, verifyemailController } from "../controllers/userController.js";
import Auth from "../middlerware/Auth.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email",verifyemailController)
userRouter.post("/login",loginUser);
userRouter.post("/logout",Auth,logoutuser)
export default userRouter;
