import { prisma } from "../lib/prisma.js";
import { logError, logEvent, logTransaction } from "../services/logs.service.js";

// Returns 403 if accessFilter is null (user has no level assigned)
function checkAccess(res, accessFilter) {
  if (accessFilter === null) {
    res.status(403).json({ success: false, error: "No level access assigned" });
    return false;
  }
  return true;
}

// ─── Hierarchy tables (region/area/cgs have extra stat columns) ───────────────

export const getCountryTable = async (req, res) => {
  try {
    await logEvent(req);
    // country table — super_admin only sees this, no level filter needed
    const data = await prisma.country.findMany();
    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRegionTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const data = await prisma.region.findMany({
      where: req.accessFilter.region
        ? { name: req.accessFilter.region }
        : {},
    });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAreaTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region) where.region = req.accessFilter.region;
    if (req.accessFilter.area)   where.name   = req.accessFilter.area;

    const data = await prisma.area.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCgsTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region) where.region = req.accessFilter.region;
    if (req.accessFilter.area)   where.area   = req.accessFilter.area;

    const data = await prisma.cgs.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getStationTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region)  where.region = req.accessFilter.region;
    if (req.accessFilter.area)    where.area   = req.accessFilter.area;
    // engineer/operator filter — station key maps to station name
    if (req.accessFilter.station) where.name   = req.accessFilter.station;

    const data = await prisma.station.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const fetchAssetTable = (modelName) => async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region)  where.region  = req.accessFilter.region;
    if (req.accessFilter.area)    where.area     = req.accessFilter.area;
    // manager uses station key to filter asset tables directly
    // engineer/operator also use station key
    if (req.accessFilter.station) where.station  = req.accessFilter.station;

    const data = await prisma[modelName].findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCompressorTable = fetchAssetTable("compressor");
export const getDispenserTable  = fetchAssetTable("dispenser");
export const getDeviceTable     = fetchAssetTable("device");
export const getIndustrialTable = fetchAssetTable("industrial");
export const getCommercialTable = fetchAssetTable("commercial");
export const getDomesticTable   = fetchAssetTable("domestic");

export const getPngTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region) where.region = req.accessFilter.region;
    if (req.accessFilter.area)   where.area   = req.accessFilter.area;

    const data = await prisma.png.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getLcngTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region) where.region = req.accessFilter.region;
    if (req.accessFilter.area)   where.area   = req.accessFilter.area;

    const data = await prisma.lcng.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getDrsTable = async (req, res) => {
  try {
    await logEvent(req);
    if (!checkAccess(res, req.accessFilter)) return;

    const where = {};
    if (req.accessFilter.region) where.region = req.accessFilter.region;
    if (req.accessFilter.area)   where.area   = req.accessFilter.area;

    const data = await prisma.drs.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRegion = async (req, res) => {
  try {
    await logEvent(req);

    const data = await prisma.region.findMany({
      select: { name: true },
      orderBy: { name: "asc" }
    });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAreasByRegion = async (req, res) => {
  try {
    await logEvent(req);

    const { region } = req.params;

    const data = await prisma.area.findMany({
      where: { region },
      select: { name: true, region: true },
    });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getStationsByArea = async (req, res) => {
  try {
    await logEvent(req);

    const { area } = req.params;

    const data = await prisma.station.findMany({
      where: { area },
      select: { name: true, area: true, region: true },
    });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};