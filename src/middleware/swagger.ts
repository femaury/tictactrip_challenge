import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import swaggerDocument from "../config/swagger.json";

export const handleDocumentation = (router: Router) => 
    router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
