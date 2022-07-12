import Joi from "joi";

const newPaymentSchema = Joi.object({
  amount: Joi.number().min(1),
  password: Joi.string().trim().length(4)
  .pattern(/^[0-9]+$/, 'numeric-string').required(),
});

export default newPaymentSchema;