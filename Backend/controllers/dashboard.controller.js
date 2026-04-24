import { prisma } from "../lib/prisma.js";
import {
  logError,
  logEvent,
  logTransaction,
} from "../services/logs.service.js";
import {
  isEntityAccessible,
} from "../helpers/filterHelpers.js";


export const getDefaultDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const { role, level, regions, areas, stations } = req.user;
    const filter = req.accessFilter;

    let defaultLevel;
    let data;

    if (role === "super_admin") {
      defaultLevel = "country";
      data = await prisma.region.findMany({ orderBy: { name: "asc" } });
    } else if (level === "region") {
      defaultLevel = "region";
      data = await prisma.region.findMany({
        where: { name: { in: regions } },
        orderBy: { name: "asc" },
      });
    } else if (level === "area") {
      defaultLevel = "area";
      data = await prisma.area.findMany({
        where: { name: { in: areas } },
        orderBy: { name: "asc" },
      });
    } else if (level === "station") {
      defaultLevel = "station";
      data = await prisma.station.findMany({
        where: { name: { in: stations } },
        orderBy: { name: "asc" },
      });
    }

    await logTransaction(req);
    res.status(200).json({ success: true, default_level: defaultLevel, data });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRegionDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const { regionName } = req.params;
    const filter = req.accessFilter;

    if (!isEntityAccessible(filter, "region", regionName)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const [region, areas] = await Promise.all([
      prisma.region.findFirst({ where: { name: regionName } }),
      prisma.area.findMany({
        where: {
          region: regionName,
          ...(filter.area && { name: { in: filter.area.in } }),
        },
        orderBy: { name: "asc" },
      }),
    ]);

    if (!region) {
      return res
        .status(404)
        .json({ success: false, error: "Region not found" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "region",
      entity: region,
      children: { level: "area", data: areas },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAreaDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const { areaName } = req.params;
    const filter = req.accessFilter;

    if (!isEntityAccessible(filter, "area", areaName)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }
    const [area, stations] = await Promise.all([
      prisma.area.findFirst({ where: { name: areaName } }),
      prisma.station.findMany({
        where: {
          area: areaName,
          ...(filter.station && { name: { in: filter.station.in } }),
        },
        orderBy: { name: "asc" },
      }),
    ]);

    if (!area) {
      return res.status(404).json({ success: false, error: "Area not found" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "area",
      entity: area,
      children: { level: "station", data: stations },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCgsDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const { cgsName } = req.params;
    const filter = req.accessFilter;

    if (!isEntityAccessible(filter, "cgs", cgsName)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const [cgs, stations] = await Promise.all([
      prisma.cgs.findFirst({ where: { name: cgsName } }),
      prisma.station.findMany({
        where: {
          cgs: cgsName,
          ...(filter.station && { name: { in: filter.station.in } }),
        },
        orderBy: { name: "asc" },
      }),
    ]);

    if (!cgs) {
      return res.status(404).json({ success: false, error: "CGS not found" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "cgs",
      entity: cgs,
      children: { level: "station", data: stations },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getStationDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const { stationName } = req.params;
    const filter = req.accessFilter;

    if (!isEntityAccessible(filter, "station", stationName)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const [station, compressors, dispensers, devices] = await Promise.all([
      prisma.station.findFirst({ where: { name: stationName } }),
      prisma.compressor.findMany({
        where: { station: stationName },
        orderBy: { name: "asc" },
      }),
      prisma.dispenser.findMany({
        where: { station: stationName },
        orderBy: { name: "asc" },
      }),
      prisma.device.findMany({ where: { station: stationName } }),
    ]);

    if (!station) {
      return res
        .status(404)
        .json({ success: false, error: "Station not found" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "station",
      entity: station,
      children: {
        compressors,
        dispensers,
        devices,
      },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCompressorDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const id = parseInt(req.params.compressorId);

    const compressor = await prisma.compressor.findUnique({ where: { id } });

    if (!compressor) {
      return res
        .status(404)
        .json({ success: false, error: "Compressor not found" });
    }

    const filter = req.accessFilter;
    if (!isEntityAccessible(filter, "station", compressor.station)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "compressor",
      entity: compressor,
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getDispenserDashboard = async (req, res) => {
  try {
    await logEvent(req);

    const id = parseInt(req.params.dispenserId);

    const dispenser = await prisma.dispenser.findUnique({ where: { id } });

    if (!dispenser) {
      return res
        .status(404)
        .json({ success: false, error: "Dispenser not found" });
    }

    const filter = req.accessFilter;
    if (!isEntityAccessible(filter, "station", dispenser.station)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    await logTransaction(req);
    res.status(200).json({
      success: true,
      dashboard_level: "dispenser",
      entity: dispenser,
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};
