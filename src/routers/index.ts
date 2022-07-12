import { Router } from "express";

import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const mainRouter = Router();
mainRouter.use(cardRouter);
mainRouter.use(rechargeRouter);

export default mainRouter;