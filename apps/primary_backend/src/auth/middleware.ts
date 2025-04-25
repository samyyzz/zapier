import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization as string;
  if (!token) {
    res
      .status(411)
      .json({ message: "No auth-header provided, authorization failed !" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "you are not logged in",
      error: error,
    });
  }
};
