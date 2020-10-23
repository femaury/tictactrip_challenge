import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP401Error, HTTP403Error, HTTP400Error } from "../utils/httpErrors";
import config from "../config";
import knex from "../config/knex";

interface IJWT {
    email: string;
}

/**
 * Middleware function that checks the `Authorization` headers for a valid JWT.
 * 
 * @sets `req.credentials` with decoded JWT.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return next(new HTTP401Error("Missing authorization headers."));
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as IJWT;
        req.credentials = decoded;
        await checkRateLimit(decoded.email);
        next();
    } catch (e) {
        next(new HTTP401Error("Invalid access token."));
    }
};

/**
 * Verifies that `req.credentials` has the correct scope.
 * 
 * @requires req.credentials `authenticate` middleware needs to be called first.
 * 
 * @param authScope scope that is checked against credentials
 * 
 * @returns middleware function
 */
const checkRateLimit = async (email: string) => {
    const limits = await knex.table("limits").select("*").where({ user_email: email, date: "CURRENT_DATE" });

    console.log("LIMITS:", limits);
}