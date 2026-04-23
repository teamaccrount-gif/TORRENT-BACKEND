import { randomUUID } from "crypto";

export const generateId = (req, res, next) => {
  req.requestId = randomUUID();
  next();
};