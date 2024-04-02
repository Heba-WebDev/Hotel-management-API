import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
const {FAIL} = statusCode;

const getRoomByIdSchema = joi.object({
  id: joi.string().required().messages({
    "string.empty": "A valid room id is required.",
    "string.required": "A valid room id is required.",
  }),
});

const getRoomByIdValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getRoomByIdSchema.validateAsync(req.params);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message });
    }
  }
};

export { getRoomByIdValidation };
