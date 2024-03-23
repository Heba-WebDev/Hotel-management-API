import joi from "joi";
const createRoomSchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "A room's name is required.",
    "string.required": "A room's name is required.",
    "string.min": "Room's must have at least 3 characters.",
  }),
  roomType: joi.string().required().messages({
    "string.empty": "A valid roomType is required.",
    "string.required": "A valid roomType is required.",
  }),
  price: joi.number().required().messages({
    "price.number": "A valid number as a price is required.",
    "number.empty": "A valid price is required.",
    "string.required": "A valid price is required.",
  }),
});

export { createRoomSchema };
