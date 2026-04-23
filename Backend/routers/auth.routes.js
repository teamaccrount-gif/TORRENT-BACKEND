import express from "express";

import { login, logout, refreshToken } from "../controllers/auth.controller.js";
import { generateId } from "../middlewares/generateid.js";

const router = express.Router();

router.post("/login",   generateId, login);
router.post("/refresh", generateId, refreshToken);
router.post("/logout",  generateId, logout);

export default router;