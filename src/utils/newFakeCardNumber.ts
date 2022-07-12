import { faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";

export default async function newFakeCardNumber(req: Request, res: Response, next: NextFunction) {
  const newFakeNumber = faker.finance.creditCardNumber("################");
  req.body.number = newFakeNumber;
  
  const newFakeCVC = faker.finance.creditCardCVV();
  req.body.securityCode = newFakeCVC;

  next();
}