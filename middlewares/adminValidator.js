import { globalError } from "../utils/globalError";
import { userRole } from "../utils/userRoles";
import { statusCode } from "../utils/httpStatusCode";
const { FAIL } = statusCode;
const { ADMIN } = userRole;

const allowTo = (role) => {
  return (req, res, next) => {
    if (req.decodedToken?.role === role) {
      return next();
    } else {
      const error = new globalError(
        "Not autherized to perform this action.",
        401,
        FAIL
      );
      next(error);
    }
  };
};

export { allowTo };
