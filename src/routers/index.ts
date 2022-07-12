import { Router } from "express";

import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import paymentRouter from "./paymentRouter.js";

const mainRouter = Router();
mainRouter.use(cardRouter);
mainRouter.use(rechargeRouter);
mainRouter.use(paymentRouter);

export default mainRouter;