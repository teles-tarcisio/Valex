import { Request, Response } from "express";
import {
  cardServices,
  employeeServices,
} from "../services/index.js";

export async function createNewCard(req: Request, res: Response): Promise<Object> {
  //console.log('LOCALS: ', res.locals, '<<<<');
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
    throw { type: 'notFound', message: 'employee does not exist' };
  }

  
  
  return res.status(501).send(cardData);
}