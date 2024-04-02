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
const loginValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loginSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error === null || error === void 0 ? void 0 : error.message });
        }
    }
});
export { loginValidation };
