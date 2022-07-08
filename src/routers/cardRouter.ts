import { Router } from "express";
import {
  validateAPIKey,
} from "../middlewares/index.js";

const cardRouter = Router();

cardRouter.get(
  "/cards/new-card",
  validateAPIKey,
  (req, res) => {
  return res.status(501).send(res.locals);
});

export default cardRouter;