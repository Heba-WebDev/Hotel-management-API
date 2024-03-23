import express from "express";
import {
  register,
  login,
  deleteAccount,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import validatorMiddleware from "../middlewares/inputValidator.js";
export const userRouter = express.Router();

userRouter
  .route("/register")
  .post(validatorMiddleware("registerSchema"), register);
userRouter.route("/login").post(validatorMiddleware("loginSchema"), login);
userRouter
  .route("/")
  .delete(
    validatorMiddleware("deleteAccountSchema"),
    verifyToken,
    deleteAccount
  );
