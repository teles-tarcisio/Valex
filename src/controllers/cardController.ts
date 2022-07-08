import { Request, Response } from "express";

export async function createNewCard(req: Request, res: Response): Promise<Object> {
  //console.log('LOCALS: ', res.locals, '<<<<');

  const cardData: Object = res.locals.payload;
  
  return res.status(501).send(cardData);
}