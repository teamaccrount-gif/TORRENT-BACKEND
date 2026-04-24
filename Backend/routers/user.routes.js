import express from "express";

import {
  getRoles,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getSingleUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { generateId } from "../middlewares/generateid.js";

const router = express.Router();

router.get("/role", generateId, authenticate, getRoles);
router.get("/", generateId, authenticate, getUsers);
router.get("/:id", generateId, authenticate, authorize("edit_user"), getSingleUser)
router.post(
  "/",
  generateId,
  authenticate,
  authorize("create_user"),
  createUser,
);
router.put(
  "/:id",
  generateId,
  authenticate,
  authorize("edit_user"),
  updateUser,
);
router.delete(
  "/:id",
  generateId,
  authenticate,
  authorize("delete_user"),
  deleteUser,
);

export default router;
