import joi from "joi";
import { Request, Response, NextFunction } from "express";

export class Validator {
  constructor(private schema: joi.Schema) {}

  validate(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const status = this.schema.validate(body);
    if (status.error) {
      res.status(400).send(status.error);
      return;
    }

    req.body = status.value;
    next();
  }
}
