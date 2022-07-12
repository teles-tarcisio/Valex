import Joi from "joi";

const rechargeCardSchema = Joi.object({
  amount: Joi.number().min(1),
});

export default rechargeCardSchema;