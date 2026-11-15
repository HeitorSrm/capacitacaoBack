import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../models/interfaces/user/auth/Payload";

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    if (!token) {
        return response.status(401).end();
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return response.status(500).json({ error: "JWT_SECRET não configurado" });
    }

    try {
        const { sub } = verify(token, secret) as Payload;

        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).end();
    }
}