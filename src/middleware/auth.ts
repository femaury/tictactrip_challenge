import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP401Error, HTTP402Error, HTTPClientError } from "../utils/httpErrors";
import config from "../config";
import knex from "../config/knex";

interface IJWT {
    id: number;
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

        const currentWords = await checkRateLimit(decoded.id, req.body);
        req.currentWords = currentWords;
        next();
    } catch (e) {
        // TODO: Same as in errorHandler.ts - can't intercept classes that are instance of HTTPClientError...
        if (e instanceof HTTPClientError) {
            return next(e);
        }
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
const checkRateLimit = async (id: number, text: string) => {
    const words = countWords(text);
    const [limit] = await knex.table("limits").select("*").where({ user_id: id }).andWhere(knex.raw("date = CURRENT_DATE"));
    let currentWords = words;

    if (limit) {
        if (words + limit.words > 80000) {
            throw new HTTP402Error("You have exceeded the free limit of 80 000 words per day.");
        }
        await knex.table("limits").update({ words: words + limit.words }).where({ user_id: id}).andWhere(knex.raw("date = CURRENT_DATE"));
        currentWords += limit.words;
    } else {
        await knex.table("limits").insert({user_id: id, words });
    }
    return currentWords;
}

function countWords(s: string){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s.split(' ').filter(String).length;
}