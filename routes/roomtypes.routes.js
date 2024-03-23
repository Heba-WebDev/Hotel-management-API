import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import validatorMiddleware from "../middlewares/inputValidator.js";
import {
  createRoomType,
  getAllRoomTypes,
} from "../controllers/rooms.controllers.js";

export const roomTypesRouter = express.Router();

roomTypesRouter.route("/").get(getAllRoomTypes);
roomTypesRouter
  .route("/")
  .post(
    validatorMiddleware("createRoomTypeSchema"),
    verifyToken,
    createRoomType
  );
