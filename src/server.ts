import express, { Request, Response } from "express";
import http from "http";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import SwaggerUI from "swagger-ui-express";
import swaggerJSON from "../swagger.json";

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
    
    router.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerJSON))
    router.get("/test", (req: Request, res: Response) => {
        console.log("toto");
        res.json({hello: "world"})
    })
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);

    const server = http.createServer(router);

    return server;
}