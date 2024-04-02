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
const getRoomByIdSchema = joi.object({
    id: joi.string().required().messages({
        "string.empty": "A valid room id is required.",
        "string.required": "A valid room id is required.",
    }),
});
const getRoomByIdValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getRoomByIdSchema.validateAsync(req.params);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: FAIL, message: error === null || error === void 0 ? void 0 : error.message });
        }
    }
});
export { getRoomByIdValidation };
