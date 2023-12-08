import express from "express";
import { login, singup } from "../controllers/userControls.js";



const userRouter = express.Router();


userRouter.post("/signup", singup);
userRouter.post("/login", login);
export default userRouter;