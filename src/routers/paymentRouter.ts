import { Router } from "express";
import {
  newPaymentSchema,
} from "../schemas/index.js";
import {
  validateSchema,
} from "../middlewares/index.js";

import { paymentController } from "../controllers/index.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payments/new/:businessId/:cardId",
  validateSchema(newPaymentSchema),
  paymentController.newPayment,
)

export default paymentRouter;