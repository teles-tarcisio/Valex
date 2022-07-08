import { Request, Response, NextFunction } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  unprocessable: 422,
};

export default function errorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.type) {
    return res.status(serviceErrorToStatusCode[error.type]).send(error.message);
  }
  
  return res.status(500).send(error);
}