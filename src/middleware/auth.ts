import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(504).json({
        message: "you are not allowed to access this api",
      });
    }

    const decoded = jwt.verify(token, config.jwt_secret as string);
    req.user = decoded as JwtPayload;
    next();
  };
};

export default auth;
