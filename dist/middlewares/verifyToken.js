var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { globalError } from "../utils/globalError";
import { statusCode } from "../utils/httpStatusCode";
const { FAIL } = statusCode;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
        const err = new globalError("Token is required.", 401, FAIL);
        return next(err);
    }
    const token = authHeader;
    try {
        const decodedToken = yield jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.decodedToken = decodedToken;
        next();
    }
    catch (error) {
        const err = new globalError("Something went wrong!", 500, FAIL);
        return next(err);
    }
});
export { verifyToken };
