import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

import {
  cardServices,
  employeeServices,
} from "../services/index.js";

export async function createNewCard(req: Request, res: Response): Promise<Object> {
  const cardData: any = res.locals.payload;

  const validCardType = cardServices.checkCardType(cardData.type);
  if (!validCardType) {
    throw {
      type: "unprocessable",
      message: "invalid card type",
    };
  }
  
  const existentEmployee = await employeeServices.checkExistentEmployee(cardData.employeeId);
  if (existentEmployee === undefined) {
    throw {
      type: "notFound",
      message: "employee does not exist",
    };
  }
    
  const employeeCardsByType = await cardServices.checkEmployeeCards(cardData.employeeId, cardData.type);
  if (employeeCardsByType !== undefined) {
    throw {
      type: "unprocessable",
      message: "employee already has this card type",
    };
  }

  const uniqueCard = await cardServices.checkUniqueCard(cardData.number);
  if (uniqueCard) {
    throw {
      type: "conflict",
      message: "card number already exists",
    };
  }
  
  const formattedNameOnCard = cardServices.formatCardName(existentEmployee["fullName"]);
  cardData.cardholderName = formattedNameOnCard;
  
  cardData.expirationDate = dayjs().add(5, "y").format("MM-YY");
  
  const encryptedCVC = cardServices.encryptCVC(cardData.securityCode);
  cardData.securityCode = encryptedCVC;

  await cardServices.insertNewCard(cardData);
  return res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response): Promise<Object> {
  const cardId: number = parseInt(req.params.id, 10);

  const existentCard = await cardServices.checkExistentCard(cardId);
  if (!existentCard) {
    throw {
      type: "notFound",
      message: "non-existent card",
    };
  }
    
  const cardExpiration = existentCard["expirationDate"];
  
  const isCardExpired = cardServices.checkExpiryDate(cardExpiration);
  if (isCardExpired) {
    throw {
      type: "",
      message: "card is expired",
    };
  }
  
  if (existentCard["password"] !== null) {
    throw {
      type: "unprocessable",
      message: "card already activated",
    };
  }
  
  const receivedCVC = res.locals.payload.securityCode;
  const cardCVC = existentCard["securityCode"];
  const validatedCVC =  await cardServices.checkCVC(receivedCVC, cardCVC);
  if (!validatedCVC) {
    throw {
      type: "unauthorized",
      message: "incorrect CVC",
    };
  }

  const password = res.locals.payload.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  await cardServices.createCardPassword(existentCard, hashedPassword);
  
  return res.status(201).send("card succesfully activated");
}