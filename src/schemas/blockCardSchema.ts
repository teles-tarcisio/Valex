import Joi from "joi";

const blockCardSchema = Joi.object({
  password: Joi.string().trim().length(4)
    .pattern(/^[0-9]+$/, 'numeric-string').required(),
});

export default blockCardSchema;