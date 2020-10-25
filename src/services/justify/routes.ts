import express, { Request, Response, NextFunction } from "express";
import * as Auth from "../../middleware/auth";
import * as JustifyController from "./controller";
import { catchErrors } from "../../utils/asyncCatch";

const router = express.Router();

router.post('/',
    Auth.authenticate,
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const justifiedText = JustifyController.justifyText(req.body);

        res.header({ "X-Current-Word-Count": req.currentWords, "X-Word-Count-Limit": 80000 }).send(justifiedText);
    })
)

export default { path: "/justify", router };