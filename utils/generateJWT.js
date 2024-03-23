import jwt from "jsonwebtoken";

const generateJwt = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
  return token;
};

export { generateJwt };
