import express from "express";

import {
  getMapData,
  updateAreaBoundary,
  updateRegionBoundary,
  updateStationLocation,
} from "../controllers/gis.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { generateId } from "../middlewares/generateId.js";

const router = express.Router();

// Public read — frontend map fetches this
router.get("/", generateId, authenticate, getMapData);

// Admin only — update coordinates
router.put("/station/:name/location", generateId, authenticate, authorize("update_location"), updateStationLocation);
router.put("/area/:name/boundary",    generateId, authenticate, authorize("update_location"), updateAreaBoundary);
router.put("/region/:name/boundary",  generateId, authenticate, authorize("update_location"), updateRegionBoundary);

export default router;