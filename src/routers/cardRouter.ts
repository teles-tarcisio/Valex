import { Router } from "express";
import {
  newCardSchema,
  activateCardSchema,
} from "../schemas/index.js";
import {
  validateAPIKey,
  validateSchema,
} from "../middlewares/index.js";

import newFakeCardNumber from "../utils/newFakeCardNumber.js";

import { cardController } from "../controllers/index.js";

const cardRouter = Router();

/* ATENCAO:
  a requisicao de criar cartao aceita o numero do cartao,
  mas gera-se uma nova string numerica de 16 digitos
  que substitui o vindo na requisicao, antes do schema ser validado !
*/
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

export default cardRouter;