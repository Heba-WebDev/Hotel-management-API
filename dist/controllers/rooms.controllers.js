var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wrapper } from "../middlewares/asyncWrapper";
import { roomModel } from "../models/Room.js";
import { roomTypeModel } from "../models/RoomType.js";
import { globalError } from "../utils/globalError.js";
import { statusCode } from "../utils/httpStatusCode.js";
const { SUCCESS, FAIL } = statusCode;
/*
  NOTE: wrapper handles the catch block -
  to not repeat code in each controller
*/
const getAllRooms = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchRoomNameMatch, searchRoomTypeNameMatch, minPrice, maxPrice } = req.params;
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
    const rooms = yield roomModel.find(query);
    res.status(200).send({
        status: SUCCESS,
        message: null,
        data: rooms,
    });
}));
const getRoomById = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const room = yield roomModel.findById(id);
    if (!room) {
        const err = new globalError("No room found.", 404, FAIL);
        return next(err);
    }
    res.status(200).send({
        status: SUCCESS,
        message: null,
        data: room,
    });
}));
const getAllRoomTypes = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield roomTypeModel.find();
    res.status(200).send({
        status: SUCCESS,
        message: null,
        data: rooms,
    });
}));
const createRoomType = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        const err = new globalError("A name for the room type is required.", 404, FAIL);
        return next(err);
    }
    const token = req === null || req === void 0 ? void 0 : req.decodedToken;
    if ((token === null || token === void 0 ? void 0 : token.role) !== "Admin") {
        const err = new globalError("Unauthorized to perform this action.", 401, FAIL);
        return next(err);
    }
    const type = yield roomTypeModel.findOne({ name });
    if (!type) {
        const err = new globalError("A vaild room type is required.", 404, FAIL);
        return next(err);
    }
    const existingRoomType = yield roomTypeModel.findOne({ name });
    if (existingRoomType) {
        const err = new globalError("Room type already exists.", 400, FAIL);
        return next(err);
    }
    const newRoomType = new roomTypeModel({ name });
    yield newRoomType.save();
    res.status(201).send({
        status: SUCCESS,
        message: "Room type successfully created.",
        data: null,
    });
}));
const createRoom = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomType, price } = req.body;
    const token = req === null || req === void 0 ? void 0 : req.decodedToken;
    const type = yield roomTypeModel.findOne({ name: roomType });
    if (!type) {
        const err = new globalError("A vaild room type is required.", 404, FAIL);
        return next(err);
    }
    if ((token === null || token === void 0 ? void 0 : token.role) !== "Admin") {
        const err = new globalError("Unauthorized to perform this action.", 401, FAIL);
        return next(err);
    }
    const newRoomType = yield roomModel.create({ name, roomType, price });
    yield newRoomType.save();
    res.status(201).send({
        status: SUCCESS,
        message: "Room successfully added.",
        data: newRoomType,
    });
}));
const updateRoom = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, price, roomType } = req.body;
    const token = req.decodedToken;
    if ((token === null || token === void 0 ? void 0 : token.role) !== "Admin") {
        const err = new globalError("Unauthorized to perform this action.", 401, FAIL);
        return next(err);
    }
    if (!name && !price && !roomType) {
        const err = new globalError("A name, roomType or price are required.", 404, FAIL);
        return next(err);
    }
    const room = yield roomModel.findById(id);
    if (!room) {
        const err = new globalError("No room found.", 404, FAIL);
        return next(err);
    }
    const type = yield roomTypeModel.findOne({ name: roomType });
    if (roomType && !type) {
        const err = new globalError("A vaild room type is required.", 404, FAIL);
        return next(err);
    }
    else {
        yield room.updateOne(roomType);
    }
    if (price && !Number.isFinite(price)) {
        const err = new globalError("A vaild price is required.", 404, FAIL);
        return next(err);
    }
    else {
        yield room.updateOne(price);
    }
    if (name) {
        yield room.updateOne(name);
    }
    yield room.save();
    res.status(200).send({
        status: SUCCESS,
        message: "Room successfully update.",
        data: room,
    });
}));
const deleteRoom = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const token = req.decodedToken;
    if ((token === null || token === void 0 ? void 0 : token.role) !== "Admin") {
        const err = new globalError("Unauthorized to perform this action.", 401, FAIL);
        return next(err);
    }
    const room = yield roomModel.findById(id);
    if (!room) {
        const err = new globalError("No room found.", 404, FAIL);
        return next(err);
    }
    yield room.deleteOne();
    res.status(204).send({
        status: SUCCESS,
        message: null,
        data: null,
    });
}));
export { getAllRoomTypes, getAllRooms, getRoomById, createRoomType, createRoom, updateRoom, deleteRoom, };
