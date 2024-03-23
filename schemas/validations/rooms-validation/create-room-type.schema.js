import joi from "joi";
const createRoomTypeSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "A room's type name is required.",
    "string.required": "A room's type name is required.",
  }),
});

export { createRoomTypeSchema };
