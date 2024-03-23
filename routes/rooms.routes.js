import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import validatorMiddleware from "../middlewares/inputValidator.js";
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.controllers.js";

export const roomsRouter = express.Router();

roomsRouter.route("/").get(getAllRooms);
roomsRouter.route("/:id").get(getRoomById);
roomsRouter
  .route("/")
  .post(validatorMiddleware("createRoomSchema"), verifyToken, createRoom);
roomsRouter
  .route("/")
  .patch(validatorMiddleware("getRoomByIdSchema"), verifyToken, updateRoom);
roomsRouter
  .route("/")
  .delete(validatorMiddleware("getRoomByIdSchema"), verifyToken, deleteRoom);
