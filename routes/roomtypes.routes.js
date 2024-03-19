import express from "express";
import {
  createRoomType,
  getAllRoomTypes,
} from "../controllers/rooms.controllers.js";

export const roomTypesRouter = express.Router();

roomTypesRouter.route("/").get(getAllRoomTypes);
roomTypesRouter.route("/").post(createRoomType);
