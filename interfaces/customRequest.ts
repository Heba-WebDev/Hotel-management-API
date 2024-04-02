import { Request as ExpressRequest } from "express";

interface CustomRequest extends ExpressRequest {
    decodedToken: {
        user_id: string,
        role: string,
        iat: number,
        exp: number
    };
}

export { CustomRequest }