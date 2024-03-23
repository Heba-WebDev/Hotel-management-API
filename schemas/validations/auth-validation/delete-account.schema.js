import joi from "joi";
const deleteAccountSchema = joi.object({
  id: joi.string().id().required().messages({
    "string.empty": "A valid id is required.",
    "string.required": "A valid id is required.",
  }),
});

export { deleteAccountSchema };
