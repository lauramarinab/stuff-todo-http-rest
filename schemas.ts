import * as joi from "joi";

export interface Schema {
  addTodo: joi.ObjectSchema;
  updateTodo: joi.ObjectSchema;
}

export const schemas: Schema = {
  addTodo: joi.object().keys({
    description: joi.string().required(),
    userId: joi.number()
  }),
  updateTodo: joi.object().keys({
    description: joi.string(),
    category_id: joi.number(),
    completed: joi.boolean().strict(),
    trash: joi.boolean().strict()
  })
};
