
import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL } = statusCode;

const createRoomTypeSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "A room's type name is required.",
    "string.required": "A room's type name is required.",
  }),
});


const createRoomTypeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createRoomTypeSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message });
    }
  }
};

export { createRoomTypeValidation };
