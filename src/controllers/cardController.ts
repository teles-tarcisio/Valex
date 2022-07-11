import { Request, Response } from "express";
import dayjs from "dayjs";
import {
  cardServices,
  employeeServices,
} from "../services/index.js";
import { decryptCVC } from "../services/cardServices.js";

export async function createNewCard(req: Request, res: Response): Promise<Object> {
  const cardData: any = res.locals.payload;

  const validCardType = cardServices.checkCardType(cardData.type);
  if (!validCardType) {
    throw {
      type: "unprocessable",
      message: "invalid card type",
    };
  }
  
  const employeeExists = await employeeServices.checkExistentEmployee(cardData.employeeId);
  if (!employeeExists) {
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
  
  const formattedNameOnCard = cardServices.formatCardName(cardData.cardholderName);
  cardData.cardholderName = formattedNameOnCard;
  
  // create expiration date:
  cardData.expirationDate = dayjs().add(5, "y").format("MM-YY");
  
  // encriptar CVC com cryptr
  const encryptedCVC = cardServices.encryptCVC(cardData.securityCode);
  console.log(encryptedCVC);
  console.log(cardServices.decryptCVC(encryptedCVC));
  
  return res.status(501).send(cardData);
}