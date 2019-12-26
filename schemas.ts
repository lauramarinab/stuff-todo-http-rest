import * as joi from "joi";

export interface Schema {
  // todo
  addTodo: joi.ObjectSchema;
  updateTodo: joi.ObjectSchema;
  // category
  addCategory: joi.ObjectSchema;
}

export const schemas: Schema = {
  addTodo: joi.object().keys({
    description: joi.string().required(),
    categoryId: joi.number().allow(null),
    userId: joi.number()
  }),
  updateTodo: joi.object().keys({
    description: joi.string(),
    categoryId: joi.number(),
    completed: joi.boolean().strict(),
    trash: joi.boolean().strict()
  }),
  addCategory: joi.object().keys({
    name: joi.string().required()
  })
};
