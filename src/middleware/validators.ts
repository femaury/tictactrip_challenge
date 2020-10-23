import { Request, Response, NextFunction } from "express";
import { ValidationError } from "fastest-validator";
import v from "../config/validator";
import { HTTP400Error } from "../utils/httpErrors";

/* ---- VALIDATION SCHEMAS ---- */
//  - must use convert: true since parsed params are always strings

const emailOnly = v.compile({
    email: { type: "email", normalize: true },
    $$strict: true
});

export const schemas = {
    emailOnly
};

/* ---- VALIDATION MIDDLEWARE ---- */

type Validator = (value: any) => true | ValidationError[];

export const validateQuery = (validator: Validator) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const validation = validator(req.query);
        if (validation === true) {
            return next();
        }
        const message = `${validation[0].message} Expected: ${validation[0].expected}`;
        next(new HTTP400Error(message));
    }

export const validateParams = (validator: Validator) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const validation = validator(req.params);
        if (validation === true) {
            return next();
        }
        const message = `${validation[0].message} Expected: ${validation[0].expected}`;
        next(new HTTP400Error(message));
    }

export const validateBody = (validator: Validator) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const validation = validator(req.body);
        if (validation === true) {
            return next();
        }
        console.log(validation);
        const message = `${validation[0].message} Expected: ${validation[0].expected}`;
        next(new HTTP400Error(message));
    }

export const validateHeaders = (validator: Validator) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const validation = validator(req.headers);
        if (validation === true) {
            return next();
        }
        const message = `${validation[0].message} Expected: ${validation[0].expected}`;
        next(new HTTP400Error(message));
    }