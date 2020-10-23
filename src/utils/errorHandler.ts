import { Request, Response, NextFunction } from "express";
import config from "../config";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";

export const notFoundError = () => {
    throw new HTTP404Error("Method not found.");
};

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // TODO: This doesn't intercept HTTP404Error above...
    if (err instanceof HTTPClientError) {
        req.log.warn(err.name + ' - ' + err.message);
        res.status(err.statusCode).send({ status: err.status, message: err.message });
    } else {
        next(err);
    }
};

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    req.log.error(err);
    if (config.NODE_ENV === "production") {
        res.status(500).send({ status: "Internal server error" });
    } else {
        res.status(500).send({ status: "Internal server error", message: err.stack });
    }
};