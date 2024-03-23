import { registerSchema } from "./validations/auth-validation/registration.schema.js";
import { loginSchema } from "./validations/auth-validation/login.schema.js";
import { deleteAccountSchema } from "./validations/auth-validation/delete-account.schema.js";
import { getRoomByIdSchema } from "./validations/rooms-validation/get-room-by-id.schema.js";
import { createRoomSchema } from "./validations/rooms-validation/create-room.schema.js";
import { createRoomTypeSchema } from "./validations/rooms-validation/create-room-type.schema.js";

const validationObj = {
  registerSchema,
  loginSchema,
  deleteAccountSchema,
  getRoomByIdSchema,
  createRoomSchema,
  createRoomTypeSchema,
};

export default validationObj;
