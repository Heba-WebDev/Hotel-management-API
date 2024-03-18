import { wrapper } from "../middlewares/asyncWrapper";
import { SUCCESS, FAIL } from "../utils/httpStatusCode";

// wrapper handles the catch block - to not repeat code
const getAllRooms = wrapper(async (req, res, next) => {});

const getRoomById = wrapper(async (req, res, next) => {});

const getAllRoomTypes = wrapper(async (req, res, next) => {});

const createRoomType = wrapper(async (req, res, next) => {});

const createRoom = wrapper(async (req, res, next) => {});

const updateRoom = wrapper(async (req, res, next) => {});

const deleteRoom = wrapper(async (req, res, next) => {});

export {
  getAllRoomTypes,
  getAllRooms,
  getRoomById,
  createRoomType,
  createRoom,
  updateRoom,
  deleteRoom,
};
