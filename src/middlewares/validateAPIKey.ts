import { NextFunction, Request, Response } from 'express';
import { companyRepository } from '../repositories/index.js';

export default async function validateAPIKey(req: Request, res: Response, next: NextFunction) {
  const key: string = req.get('x-api-key');
  if(!key) {
    throw { type: 'unprocessable', message: 'missing API key' };
  }

  const companyFromKey = await companyRepository.findByApiKey(key);
  if (!companyFromKey) {
    throw { type: 'notFound', message: 'non-existent API key' };
  }

  delete companyFromKey.apiKey;

  res.locals.companyData = companyFromKey;
  next();
}