import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      const errorDetails = validation.error.details[0];
      throw {
        type: "unprocessable",
        message: errorDetails.message,
      };
    }

    const payload = validation.value;
    res.locals.payload = payload;
    next();
  }
}