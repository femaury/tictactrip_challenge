import { Router, Express } from "express";
import config from "../config";

type Wrapper = ((app: Express) => void);

export const applyMiddleware = (middleware: Wrapper[], app: Express) => {
    for (const f of middleware) {
        f(app);
    }
};

type Route = {
    path: string;
    router: Router;
};

export const applyRoutes = (routes: Route[], app: Express) => {
    const { ROUTE_PREFIX } = config;

    for (const route of routes) {
        app.use(ROUTE_PREFIX + route.path, route.router);
    }
};