import express from "express";
import {
  getAllRooms,
  getAllRoomTypes,
  getRoomById,
  createRoom,
  createRoomType,
  updateRoom,
  deleteRoom,
} from "../controllers/rooms.controllers";

export const roomsRouter = express.Router();

roomsRouter.route("/").get(getAllRooms);
roomsRouter.route("/:id").get(getRoomById);
roomsRouter.route("/").post(createRoom);
roomsRouter.route("/").patch(updateRoom);
roomsRouter.route("/").delete(deleteRoom);
roomsRouter.route("/rooms-types").get(getAllRoomTypes);
roomsRouter.route("/room-types").post(createRoomType);
