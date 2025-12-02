import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("ami tr baap", Date.now(), req.path, req.url);
  next();
};

export default logger;
