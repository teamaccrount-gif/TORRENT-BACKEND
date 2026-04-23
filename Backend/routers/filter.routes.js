import express from "express";

import { generateId } from "../middlewares/generateid.js";
import { getAggrigationData, getDelta, getLatestData, getRawData, getTags } from "../controllers/filter.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/tag", generateId, authenticate, getTags);

router.post("/raw", generateId, authenticate, getRawData);

router.post("/aggregation", generateId, authenticate, getAggrigationData);

router.post("/delta", generateId, authenticate, getDelta);

router.post("/latest", generateId, authenticate, getLatestData);

export default router;
