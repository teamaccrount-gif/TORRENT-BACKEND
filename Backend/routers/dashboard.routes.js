import express from "express";

import { generateId } from "../middlewares/generateid.js";
import { authenticate } from "../middlewares/authenticate.js";
import { applyLevelAccess } from "../middlewares/levelAccess.js";
import {
  getDefaultDashboard,
  getRegionDashboard,
  getAreaDashboard,
  getCgsDashboard,
  getStationDashboard,
  getCompressorDashboard,
  getDispenserDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

const mw = [generateId, authenticate, applyLevelAccess];

// Default entry point — redirects based on user's level
router.get("/",                          ...mw, getDefaultDashboard);

// Entity-specific dashboards
router.get("/region/:regionName",        ...mw, getRegionDashboard);
router.get("/area/:areaName",            ...mw, getAreaDashboard);
router.get("/cgs/:cgsName",              ...mw, getCgsDashboard);
router.get("/station/:stationName",      ...mw, getStationDashboard);
router.get("/compressor/:compressorId",  ...mw, getCompressorDashboard);
router.get("/dispenser/:dispenserId",    ...mw, getDispenserDashboard);

export default router;