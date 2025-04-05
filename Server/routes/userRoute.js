import { Router } from "express";
import { loginUser, registerUserController, verifyemailController } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email",verifyemailController)
userRouter.post("/login",loginUser)
export default userRouter;
