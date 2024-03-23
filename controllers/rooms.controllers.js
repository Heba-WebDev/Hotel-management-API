import wrapper from "../middlewares/asyncWrapper.js";
import { roomModel } from "../models/Room.js";
import { roomTypeModel } from "../models/RoomType.js";
import { globalError } from "../utils/globalError.js";
import { statusCode } from "../utils/httpStatusCode.js";
const { SUCCESS, FAIL } = statusCode;

/*
  NOTE: wrapper handles the catch block -
  to not repeat code in each controller
*/

const getAllRooms = wrapper(async (req, res, next) => {
  const { searchRoomNameMatch, searchRoomTypeNameMatch, minPrice, maxPrice } =
    req.query;
  const query = {};
  if (searchRoomNameMatch) {
    query.name = { $regex: searchRoomNameMatch, $options: "i" };
  }
  if (searchRoomTypeNameMatch) {
    query.roomType = searchRoomTypeNameMatch;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = parseFloat(maxPrice);
    }
  }
  const rooms = await roomModel.find(query);
  res.status(200).send({
    status: SUCCESS,
    message: null,
    data: rooms,
  });
});

const getRoomById = wrapper(async (req, res, next) => {
  const id = req.params.id;
  const room = await roomModel.findById(id);
  if (!room) {
    const err = new globalError("No room found.", 404, FAIL);
    return next(err);
  }
  res.status(200).send({
    status: SUCCESS,
    message: null,
    data: room,
  });
});

const getAllRoomTypes = wrapper(async (req, res, next) => {
  const rooms = await roomTypeModel.find();
  res.status(200).send({
    status: SUCCESS,
    message: null,
    data: rooms,
  });
});

const createRoomType = wrapper(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const err = new globalError(
      "A name for the room type is required.",
      404,
      FAIL
    );
    return next(err);
  }
  const existingRoomType = await roomTypeModel.findOne({ name });
  if (existingRoomType) {
    const err = new globalError("Room type already exists.", 400, FAIL);
    return next(err);
  }
  const newRoomType = new roomTypeModel({ name });
  await newRoomType.save();
  res.status(201).send({
    status: SUCCESS,
    message: "Room type successfully created.",
    data: null,
  });
});

const createRoom = wrapper(async (req, res, next) => {
  const { name, roomType, price } = req.body;
  const token = req?.decodedToken;
  const type = await roomTypeModel.findOne({ name: roomType });
  if (!type) {
    const err = new globalError("A vaild room type is required.", 404, FAIL);
    return next(err);
  }
  if (token?.role !== "Admin") {
    const err = new globalError(
      "Unauthorized to perform this action.",
      401,
      FAIL
    );
    return next(err);
  }
  const newRoomType = await roomModel.create({ name, roomType, price });
  await newRoomType.save();
  res.status(201).send({
    status: SUCCESS,
    message: "Room successfully added.",
    data: newRoomType,
  });
});

const updateRoom = wrapper(async (req, res, next) => {
  const { id, name, price, roomType } = req.body;
  const token = req.decodedToken;
  if (token?.role !== "Admin") {
    const err = new globalError(
      "Unauthorized to perform this action.",
      401,
      FAIL
    );
    return next(err);
  }
  if (!name && !price && !roomType) {
    const err = new globalError(
      "A name, roomType or price are required.",
      404,
      FAIL
    );
    return next(err);
  }
  const room = await roomModel.findById(id);
  if (!room) {
    const err = new globalError("No room found.", 404, FAIL);
    return next(err);
  }
  const type = await roomTypeModel.findOne({ name: roomType });
  if (roomType && !type) {
    const err = new globalError("A vaild room type is required.", 404, FAIL);
    return next(err);
  } else {
    await room.updateOne(roomType);
  }
  if (price && !Number.isFinite(price)) {
    const err = new globalError("A vaild price is required.", 404, FAIL);
    return next(err);
  } else {
    await room.updateOne(price);
  }
  if (name) {
    await room.updateOne(name);
  }
  await room.save();
  res.status(200).send({
    status: SUCCESS,
    message: "Room successfully update.",
    data: room,
  });
});

const deleteRoom = wrapper(async (req, res, next) => {
  const { id } = req.body;
  const token = req.decodedToken;
  if (token?.role !== "Admin") {
    const err = new globalError(
      "Unauthorized to perform this action.",
      401,
      FAIL
    );
    return next(err);
  }
  const room = await roomModel.findById(id);
  if (!room) {
    const err = new globalError("No room found.", 404, FAIL);
    return next(err);
  }
  await room.deleteOne();
  res.status(204).send({
    status: SUCCESS,
    message: null,
    data: null,
  });
});

export {
  getAllRoomTypes,
  getAllRooms,
  getRoomById,
  createRoomType,
  createRoom,
  updateRoom,
  deleteRoom,
};
