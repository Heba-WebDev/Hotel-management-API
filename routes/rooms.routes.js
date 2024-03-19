import express from "express";
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
roomsRouter.route("/").post(createRoom);
roomsRouter.route("/").patch(updateRoom);
roomsRouter.route("/").delete(deleteRoom);
