import joi from "joi";

import { Validator } from "./validator";

const schema = joi.object({
  title: joi.string().required(),
  creator: joi.string().required(),
  body: joi.string().required(),
});

const newTodoValidator = new Validator(schema);

export default newTodoValidator;
