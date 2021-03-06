import Joi from "joi";

const newCardSchema = Joi.object({
  employeeId: Joi.number().min(1).required(),
  number: Joi.string().trim().min(16).max(25).required(),
  securityCode: Joi.string().trim().min(3).max(4).required(),
  isVirtual: Joi.boolean().required(),
  originalCardId: Joi.number().min(1).allow(null),
  isBlocked: Joi.boolean().required(),
  type: Joi.string().trim().required(),
});

export default newCardSchema;