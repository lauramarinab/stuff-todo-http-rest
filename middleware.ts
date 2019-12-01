import * as joi from "joi";
import { Request, Response } from "express";
import { Params, NextFunction } from "express-serve-static-core";

export const middleware = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = joi.validate(req.body, schema);
    const valid: boolean = error === null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message: string = details.map(i => i.message).join(",");

      console.log("error:", message);
      res.status(422).json({ error: message });
    }
  };
};
