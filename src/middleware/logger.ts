import pino from "pino-http";
import { Router } from "express";

export const handleLogging = (router: Router) =>
    router.use(pino());