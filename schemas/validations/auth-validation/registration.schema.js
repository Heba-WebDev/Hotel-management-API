import joi from "joi";
const registerSchema = joi.object({
  username: joi.string().required().min(3).max(20).messages({
    string: "A username is required.",
    "string.empty": "A valid username is required.",
    "string.required": "A valid username is required.",
    "string.min": "Username must have at least 3 characters.",
    "string.max": "Username must have less than 20 characters.",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
    }),
  password: joi
    .string()
    .min(3)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "A valid password is required.",
      "string.required": "A valid password is required.",
      "string.min": "Password must have at least 3 characters.",
      "string.pattern": "A password must be of 3 characters or more.",
    }),
});

export { registerSchema };
