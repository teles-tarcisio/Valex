import { Request, Response } from "express";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

import {
  cardServices,
  employeeServices,
  rechargeServices,
} from "../services/index.js";

export async function recharge(req: Request, res: Response): Promise<Object> {
  const { companyData } = res.locals;
  const rechargeValue = parseInt(res.locals.payload.amount);
  const cardId = parseInt(req.params.id, 10);

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

  const employeeId = existentCard["employeeId"];
  const existentEmployee = await employeeServices.checkExistentEmployee(employeeId);
  if (existentEmployee === undefined) {
    throw {
      type: "notFound",
      message: "employee does not exist",
    };
  }
  
  if (!rechargeServices.isEmployeeFromCompany(companyData, existentEmployee)) {
    throw {
      type: "unprocessable",
      message: "employee is not from this company",
    };
  };

  await rechargeServices.rechargeCard(cardId, rechargeValue);

  return res.status(201).send("card successfully recharged");
}