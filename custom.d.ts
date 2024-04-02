declare namespace Express {
    interface Request {
        decodedToken?: {
            user_id: string,
            role: string,
            iat: number,
            exp: number
        };
    }
}