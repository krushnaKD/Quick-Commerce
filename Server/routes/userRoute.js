import { Router } from "express";
import { loginUser, logoutuser, registerUserController, uploadAvtar, verifyemailController } from "../controllers/userController.js";
import Auth from "../middlerware/Auth.js";
import upload from "../middlerware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email",verifyemailController)
userRouter.post("/login",loginUser);
userRouter.post("/logout",Auth,logoutuser);
userRouter.put('/upload-avtar',Auth,upload.single('avatar'),uploadAvtar)
export default userRouter;
