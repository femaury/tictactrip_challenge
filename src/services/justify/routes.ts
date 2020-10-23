import express, { Request, Response, NextFunction } from "express";
import * as Auth from "../../middleware/auth";
import { catchErrors } from "../../utils/asyncCatch";

const router = express.Router();

router.post('/',
    Auth.authenticate,
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
    })
)

export default { path: "/justify", router };