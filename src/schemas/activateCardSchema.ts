import Joi from "joi";

const activateCardSchema = Joi.object({
  securityCode: Joi.string().trim().min(3).max(4)
    .pattern(/^[0-9]+$/, 'numeric-string').required(),
  password: Joi.string().trim().length(4)
    .pattern(/^[0-9]+$/, 'numeric-string').required(),
});

export default activateCardSchema;