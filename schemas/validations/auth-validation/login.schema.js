import joi from "joi";
const loginSchema = joi.object({
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
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .message("A minimum of 3 charachters are required for a password."),
});

export { loginSchema };
