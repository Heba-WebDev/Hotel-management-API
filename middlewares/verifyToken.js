import jwt from "jsonwebtoken";
import { globalError } from "../utils/globalError.js";
import { statusCode } from "../utils/httpStatusCode.js";
const { FAIL } = statusCode;

const verifyToken = (req, res, next) => {
  const authHeder =
    req?.headers["Authorization"] || req?.headers["authorization"];
  if (!authHeder) {
    const error = new globalError("Token is required.", 401, FAIL);
    return next(error);
  }
  const token = authHeder;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.decodedToken = decodedToken;
    return next();
  } catch (err) {
    const error = new globalError("Invalid Token.", 401, FAIL);
    return next(error);
  }
};

export { verifyToken };
