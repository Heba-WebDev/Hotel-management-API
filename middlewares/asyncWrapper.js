import { ERROR } from "../utils/httpStatusCode";

// handles error on all controllers, instead of declearing a catch block
export const wrapper = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((error) => {
      res.status(500).send({ status: ERROR, message: error.message });
    });
  };
};
