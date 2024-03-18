import express from "express";

export const roomsRouter = express.Router();

roomsRouter.route("/").get(() => {});
