import express from "express";
import http from "http";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";

export const init = async () => {

    process.on("uncaughtException", e => {
        console.log(e);
        process.exit(1);
    });

    process.on("unhandledRejection", e => {
        console.log(e);
        process.exit(1);
    });

    const router = express();
    
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);

    const server = http.createServer(router);

    return server;
}