import { Router } from "express";
import { newCardSchema } from "../schemas/index.js";
import {
  validateAPIKey,
  validateSchema,
} from "../middlewares/index.js";

import { cardController } from "../controllers/index.js";

const cardRouter = Router();

cardRouter.get(
  "/cards/new-card",
  validateAPIKey,
  validateSchema(newCardSchema),
  cardController.createNewCard,
);

export default cardRouter;