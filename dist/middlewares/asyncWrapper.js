import { statusCode } from "../utils/httpStatusCode";
const { ERROR } = statusCode;
const wrapper = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((error) => {
            res.status(500).send({ status: ERROR, message: error.message });
        });
    };
};
export { wrapper };
