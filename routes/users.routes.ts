import express from "express";
import {
  register,
  login,
  deleteAccount,
} from "../controllers/users.controllers";
import { verifyToken } from "../middlewares/verifyToken";
import { registerValidation } from "../schemas/validations/auth-validation/registration.schema";
import { loginValidation } from "../schemas/validations/auth-validation/login.schema";
import { deleteAccountValidation } from "../schemas/validations/auth-validation/delete-account.schema";
const userRouter = express.Router();

userRouter.route("/register").post(registerValidation, register);
userRouter.route("/login").post(loginValidation, login);
userRouter.route("/").delete(verifyToken, deleteAccountValidation, deleteAccount);

export { userRouter }