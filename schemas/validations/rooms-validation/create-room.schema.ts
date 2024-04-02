import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
const {FAIL} = statusCode;

const createRoomSchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "A room's name is required.",
    "string.required": "A room's name is required.",
    "string.min": "Room's must have at least 3 characters.",
  }),
  roomType: joi.string().required().messages({
    "string.empty": "A valid roomType is required.",
    "string.required": "A valid roomType is required.",
  }),
  price: joi.number().required().messages({
    "price.number": "A valid number as a price is required.",
    "number.empty": "A valid price is required.",
    "string.required": "A valid price is required.",
  }),
});

const createRoomValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createRoomSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message });
    }
  }
};


export { createRoomValidation };
