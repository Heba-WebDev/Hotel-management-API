import validationObj from "../schemas/input-validation.schema.js";

import { statusCode } from "../utils/httpStatusCode.js";
const { FAIL } = statusCode;

const validatorMiddleware = (validator) => {
  if (!validationObj.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`);
  }
  return async function (req, res, next) {
    try {
      const validated = await validationObj[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      return res
        .status(400)
        .json({ status: FAIL, message: err.message, data: null });
    }
  };
};

export default validatorMiddleware;
