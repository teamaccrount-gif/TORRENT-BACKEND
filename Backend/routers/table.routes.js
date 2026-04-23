import express from "express";

import { generateId } from "../middlewares/generateid.js";
import { authenticate } from "../middlewares/authenticate.js";
import { applyLevelAccess } from "../middlewares/levelAccess.js";
import {
  getCountryTable,
  getRegionTable,
  getAreaTable,
  getCgsTable,
  getStationTable,
  getCompressorTable,
  getDispenserTable,
  getDeviceTable,
  getPngTable,
  getLcngTable,
  getDrsTable,
  getIndustrialTable,
  getCommercialTable,
  getDomesticTable,
  getAreasByRegion,
  getStationsByArea,
  getRegion,
} from "../controllers/table.controller.js";

const router = express.Router();

router.get("/country",    generateId, authenticate, applyLevelAccess, getCountryTable);
router.get("/region",     generateId, authenticate, applyLevelAccess, getRegionTable);
router.get("/area",       generateId, authenticate, applyLevelAccess, getAreaTable);
router.get("/cgs",        generateId, authenticate, applyLevelAccess, getCgsTable);
router.get("/station",    generateId, authenticate, applyLevelAccess, getStationTable);
router.get("/compressor", generateId, authenticate, applyLevelAccess, getCompressorTable);
router.get("/dispenser",  generateId, authenticate, applyLevelAccess, getDispenserTable);
router.get("/device",     generateId, authenticate, applyLevelAccess, getDeviceTable);
router.get("/png",        generateId, authenticate, applyLevelAccess, getPngTable);
router.get("/lcng",       generateId, authenticate, applyLevelAccess, getLcngTable);
router.get("/drs",        generateId, authenticate, applyLevelAccess, getDrsTable);
router.get("/industrial", generateId, authenticate, applyLevelAccess, getIndustrialTable);
router.get("/commercial", generateId, authenticate, applyLevelAccess, getCommercialTable);
router.get("/domestic",   generateId, authenticate, applyLevelAccess, getDomesticTable);
router.get("/areas-by-region/:region",   generateId, authenticate, applyLevelAccess, getAreasByRegion);
router.get("/stations-by-area/:area",    generateId, authenticate, applyLevelAccess, getStationsByArea);
router.get("/all-regions",    generateId, authenticate, applyLevelAccess, getRegion);

export default router;