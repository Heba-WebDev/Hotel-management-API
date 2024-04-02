import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createRoomTypeValidation } from "../schemas/validations/rooms-validation/create-room-type.schema";
import {
  createRoomType,
  getAllRoomTypes,
} from "../controllers/rooms.controllers";

export const roomTypesRouter = express.Router();

roomTypesRouter.route("/").get(getAllRoomTypes);
roomTypesRouter.route("/").post(verifyToken,createRoomTypeValidation, createRoomTypeValidation, createRoomType);
