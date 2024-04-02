import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL } = statusCode
const deleteAccountSchema = joi.object({
  id: joi.string().id().required().messages({
    "string.empty": "A valid id is required.",
    "string.required": "A valid id is required.",
  }),
});

const deleteAccountValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAccountSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message });
    }
  }
};


export { deleteAccountValidation };
