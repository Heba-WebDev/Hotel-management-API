import { statusCode } from "../utils/httpStatusCode.js";
const { ERROR } = statusCode;

// handles error on all controllers, instead of declearing a catch block
const wrapper = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((error) => {
      res.status(500).send({ status: ERROR, message: error.message });
    });
  };
};

export default wrapper;
