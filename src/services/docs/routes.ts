import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import swaggerDocument from "../../config/swagger.json";

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument))

export default { path: "/", absolutePath: true, router };