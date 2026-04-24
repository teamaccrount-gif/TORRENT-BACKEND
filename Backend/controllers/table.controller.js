import { prisma } from "../lib/prisma.js";
import { logError, logEvent, logTransaction } from "../services/logs.service.js";
import { checkAccess, isUnrestricted, inClause } from "../helpers/filterHelpers.js";


export const getCountryTable = async (req, res) => {
  try {
    await logEvent(req);
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

    const { region } = req.accessFilter;

    if (!region && !isUnrestricted(req.accessFilter)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const data = await prisma.region.findMany({
      // where: region ? { name: inClause(region) } : {},
      where: region ? { name: { in: region.in } } : {},
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

    const { region, area } = req.accessFilter;
    const where = {};

    if (!region && !area && !isUnrestricted(req.accessFilter)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    if (region) where.region = inClause(region);
    if (area)   where.name   = inClause(area);

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

    const { region, area } = req.accessFilter;
    const where = {};

    if (!region && !area && !isUnrestricted(req.accessFilter)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    if (region) where.region = inClause(region);
    if (area)   where.area   = inClause(area);

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

    const { region, area, station } = req.accessFilter;
    const where = {};

    if (region)  where.region = inClause(region);
    if (area)    where.area   = inClause(area);
    if (station) where.name   = inClause(station);

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

    const { region, area, station } = req.accessFilter;
    const where = {};

    if (region)  where.region  = inClause(region);
    if (area)    where.area    = inClause(area);
    if (station) where.station = inClause(station);

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

    const { region, area } = req.accessFilter;
    const where = {};

    if (region) where.region = inClause(region);
    if (area)   where.area   = inClause(area);

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

    const { region, area } = req.accessFilter;
    const where = {};

    if (region) where.region = inClause(region);
    if (area)   where.area   = inClause(area);

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

    const { region, area } = req.accessFilter;
    const where = {};

    if (region) where.region = inClause(region);
    if (area)   where.area   = inClause(area);

    const data = await prisma.drs.findMany({ where });

    await logTransaction(req);
    res.status(200).json({ success: true, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ── Dropdown helpers (no level filter — used for admin UI dropdowns) ──────────

export const getRegion = async (req, res) => {
  try {
    await logEvent(req);
    const data = await prisma.region.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
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