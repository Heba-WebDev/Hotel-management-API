var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import joi from "joi";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL } = statusCode;
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
const registerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield registerSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error === null || error === void 0 ? void 0 : error.message });
        }
    }
});
export { registerValidation };
