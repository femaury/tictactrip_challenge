import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP401Error, HTTP402Error } from "../utils/httpErrors";
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

        await checkRateLimit(decoded.id, req.body);
        next();
    } catch (e) {
        if (e.message == "You have exceeded the free limit of 80 000 words per day.") {
            throw e;
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

    if (limit) {
        if (words + limit.words > 80000) {
            throw new HTTP402Error("You have exceeded the free limit of 80 000 words per day.");
        }
        await knex.table("limits").update({ words: words + limit.words }).where({ user_id: id});
    } else {
        await knex.table("limits").insert({user_id: id, words });
    }
}

function countWords(s: string){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').filter(String).length; //- this can also be used
}