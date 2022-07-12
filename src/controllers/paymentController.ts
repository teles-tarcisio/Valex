import { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  cardServices,
  paymentServices,
  businessServices,
} from "../services/index.js";

export async function newPayment(req: Request, res: Response): Promise<Object> {
  const businessId = parseInt(req.params.businessId, 10);
  const cardId = parseInt(req.params.cardId, 10);
  const { password } : { password: string } = res.locals.payload;


  const existentCard = await cardServices.checkExistentCard(cardId);
  if (!existentCard) {
    throw {
      type: "notFound",
      message: "non-existent card",
    };
  }
  if (existentCard["isBlocked"] === true) {
    throw {
      type: "unprocessable",
      message: "this card is blocked",
    };
  }
  
  const cardExpiration = existentCard["expirationDate"];
  const isCardExpired = cardServices.checkExpiryDate(cardExpiration);
  if (isCardExpired) {
    throw {
      type: "unprocessable",
      message: "card is expired",
    };
  }

  const hashedPassword = existentCard["password"];
  const validatePassword = await bcrypt.compare(password, hashedPassword);
  if(!validatePassword) {
    throw {
      type: "unauthorized",
      message: "incorrect card password",
    };
  }

  const existentBusiness = await businessServices.find(businessId);
  if (!existentBusiness) {
    throw {
      type: "unprocessable",
      message: "business not registered",
    }
  };
  
  const businessType = existentBusiness.type;
  const cardType = existentCard["type"];
  if (businessType !== cardType) {
    throw {
      type: "unprocessable",
      message: "incompatible card and business types",
    }
  };



  // TODO: card has enough balance?
  // TODO: store payment in db

  await paymentServices.createPayment();
  return res.status(501).send("reached newPayment");
}