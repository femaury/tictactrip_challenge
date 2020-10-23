import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import helmet from "helmet";

export const handleHeaders = (router: Router) =>
    router.use(helmet());

export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};