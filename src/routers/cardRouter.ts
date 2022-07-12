import { Router } from "express";
import {
  newCardSchema,
  activateCardSchema,
  blockCardSchema,
} from "../schemas/index.js";
import {
  validateAPIKey,
  validateSchema,
} from "../middlewares/index.js";

import newFakeCardNumber from "../utils/newFakeCardNumber.js";

import { cardController } from "../controllers/index.js";

const cardRouter = Router();

cardRouter.post(
  "/cards/new-card",
  validateAPIKey,
  newFakeCardNumber,
  validateSchema(newCardSchema),
  cardController.createNewCard,
);

cardRouter.post(
  "/cards/:id/activate",
  validateSchema(activateCardSchema),
  cardController.activateCard,
);

cardRouter.put(
  "/cards/:id/block",
  validateSchema(blockCardSchema),
  cardController.blockCard,
);

cardRouter.put(
  "/cards/:id/unblock",
  validateSchema(blockCardSchema),
  cardController.unblockCard,
);

export default cardRouter;