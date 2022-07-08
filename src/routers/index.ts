import { Router } from "express";

import cardRouter from "./cardRouter.js";

const mainRouter = Router();
mainRouter.use(cardRouter);

export default mainRouter;