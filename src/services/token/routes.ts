import { Router, Request, Response, NextFunction } from "express";
import * as Validator from "../../middleware/validators";
import * as Auth from "../../middleware/auth";
import * as TokenController from "./controller";
import { catchErrors } from "../../utils/asyncCatch";

const router = Router();

router.post("/",
    Validator.validateBody(Validator.schemas.emailOnly),
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const token = await TokenController.createAccessToken(req.body.email);

        res.json({ token });
    })
);

export default { path: "/token", router };