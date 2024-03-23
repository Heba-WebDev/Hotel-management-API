import joi from "joi";

const getRoomByIdSchema = joi.object({
  id: joi.string().required().messages({
    "string.empty": "A valid room id is required.",
    "string.required": "A valid room id is required.",
  }),
});

export { getRoomByIdSchema };
