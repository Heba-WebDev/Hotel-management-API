import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom, } from "../controllers/rooms.controllers";
import { createRoomValidation } from "../schemas/validations/rooms-validation/create-room.schema";
export const roomsRouter = express.Router();
roomsRouter.route("/").get(getAllRooms);
roomsRouter.route("/:id").get(getRoomById);
roomsRouter.route("/").post(verifyToken, createRoomValidation, createRoom);
roomsRouter.route("/").patch(verifyToken, updateRoom);
roomsRouter.route("/").delete(verifyToken, deleteRoom);
