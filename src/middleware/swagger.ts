import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import swaggerDocument from "../../swagger.json";

// TODO: Not working?
export const handleDocumentation = (router: Router) => 
    router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
