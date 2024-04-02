import { Request, Response, NextFunction } from "express";
import bcrypt, { compare } from "bcrypt";
import { generateJwt } from "../utils/generateJWT";
import { wrapper } from "../middlewares/asyncWrapper";
import {userModel}  from "../models/User";
import { globalError } from "../utils/globalError";


const register = wrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const userName = await userModel.findOne({ username });
  if (userName) {
    const err = new globalError("Username already exists.", 400, "FAIL");
    return next(err);
  }
  const userEmail = await userModel.findOne({ email });
  if (userEmail) {
    const err = new globalError("Email already exists.", 400, "FAIL");
    return next(err);
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const user = new userModel({
    username,
    email,
    password: hashedPass,
  });
  await user.save();
  res.status(201).send({
    status: "SUCCESS",
    message: "User successfully registered.",
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

const login = wrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const err = new globalError("No user found.", 404, "FAIL");
    return next(err);
  }
  const matchedPassword = await compare(password, user.password as string);
  if (!matchedPassword) {
    const err = new globalError("Invalid Credentials.", 401, "FAIL");
    return next(err);
  }
  const token = await generateJwt({
    user_id: user.id,
    role: user.role,
  });

  res.status(200).send({
    status: "SUCCESS",
    message: "User successfully logged in.",
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: token,
  });
});

const deleteAccount = wrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const token = req?.decodedToken;
  const user = await userModel.findById(id);
  if (!user) {
    const err = new globalError("No user found.", 404, "FAIL");
    return next(err);
  }
  if (token?.user_id !== user.id && token?.role === "Guest") {
    const err = new globalError(
      "Unauthorized to perform this action.",
      401,
      "FAIL"
    );
    return next(err);
  }

  await user.deleteOne();
  return res.status(204).send({
    status: "SUCCESS",
    message: "Account sucessfully deleted.",
  });
});

export { register, login, deleteAccount };
