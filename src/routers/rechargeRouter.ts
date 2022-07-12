import { Router } from "express";
import {
  rechargeCardSchema,
} from "../schemas/index.js";
import {
  validateAPIKey,
  validateSchema,
} from "../middlewares/index.js";

import { rechargeController } from "../controllers/index.js";

const rechargeRouter = Router();

rechargeRouter.post(
  "/recharges/:id",
  validateAPIKey,
  validateSchema(rechargeCardSchema),
  rechargeController.recharge,
)

export default rechargeRouter;