import { Router } from "express";
import { newCardSchema } from "../schemas/index.js";
import {
  validateAPIKey,
  validateSchema,
} from "../middlewares/index.js";

import newFakeCardNumber from "../utils/newFakeCardNumber.js";

import { cardController } from "../controllers/index.js";

const cardRouter = Router();

/* ATENCAO:
  a requisicao de criar cartao aceita o numero do cartao,
  mas é gerado um novo numero que o substitui o vindo na requisicao,
  antes do schema ser validado !
*/
cardRouter.post(
  "/cards/new-card",
  validateAPIKey,
  newFakeCardNumber,
  validateSchema(newCardSchema),
  cardController.createNewCard,
);

export default cardRouter;