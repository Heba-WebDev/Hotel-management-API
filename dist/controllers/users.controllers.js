var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt, { compare } from "bcrypt";
import { generateJwt } from "../utils/generateJWT";
import { wrapper } from "../middlewares/asyncWrapper";
import { userModel } from "../models/User";
import { globalError } from "../utils/globalError";
const register = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userName = yield userModel.findOne({ username });
    if (userName) {
        const err = new globalError("Username already exists.", 400, "FAIL");
        return next(err);
    }
    const userEmail = yield userModel.findOne({ email });
    if (userEmail) {
        const err = new globalError("Email already exists.", 400, "FAIL");
        return next(err);
    }
    const hashedPass = yield bcrypt.hash(password, 10);
    const user = new userModel({
        username,
        email,
        password: hashedPass,
    });
    yield user.save();
    res.status(201).send({
        status: "SUCCESS",
        message: "User successfully registered.",
        data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
}));
const login = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel.findOne({ email });
    if (!user) {
        const err = new globalError("No user found.", 404, "FAIL");
        return next(err);
    }
    const matchedPassword = yield compare(password, user.password);
    if (!matchedPassword) {
        const err = new globalError("Invalid Credentials.", 401, "FAIL");
        return next(err);
    }
    const token = yield generateJwt({
        user_id: user.id,
        role: user.role,
    });
    res.status(200).send({
        status: "SUCCESS",
        message: "User successfully logged in.",
        data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        token: token,
    });
}));
const deleteAccount = wrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const token = req === null || req === void 0 ? void 0 : req.decodedToken;
    const user = yield userModel.findById(id);
    if (!user) {
        const err = new globalError("No user found.", 404, "FAIL");
        return next(err);
    }
    if ((token === null || token === void 0 ? void 0 : token.user_id) !== user.id && (token === null || token === void 0 ? void 0 : token.role) === "Guest") {
        const err = new globalError("Unauthorized to perform this action.", 401, "FAIL");
        return next(err);
    }
    yield user.deleteOne();
    return res.status(204).send({
        status: "SUCCESS",
        message: "Account sucessfully deleted.",
    });
}));
export { register, login, deleteAccount };
