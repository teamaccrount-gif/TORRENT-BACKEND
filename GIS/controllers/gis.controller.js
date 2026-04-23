import { prisma } from "../lib/prisma.js";
import {
  logError,
  logEvent,
  logTransaction,
} from "../services/logs.service.js";

// ─── Update station location (admin enters lat/lng) ───────────────────────────
export const updateStationLocation = async (req, res) => {
  try {
    await logEvent(req);

    const { name } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ success: false, error: "latitude and longitude are required" });
    }

    // ST_SetSRID(ST_MakePoint(lng, lat), 4326) is the standard PostGIS way
    // Note: PostGIS uses longitude first, then latitude
    await prisma.$executeRaw`
      UPDATE station
      SET location = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
      WHERE name = ${name}
    `;

    await logTransaction(req);

    res
      .status(200)
      .json({ success: true, message: "Station location updated" });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── Update area boundary (admin enters polygon coordinates) ──────────────────
export const updateAreaBoundary = async (req, res) => {
  try {
    await logEvent(req);

    const { name } = req.params;

    // coordinates is an array of [lng, lat] pairs forming a polygon
    // Example: [[72.5, 23.0], [72.6, 23.0], [72.6, 23.1], [72.5, 23.1], [72.5, 23.0]]
    // First and last point must be the same to close the polygon
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 4) {
      return res.status(400).json({
        success: false,
        error:
          "coordinates must be an array of at least 4 [longitude, latitude] pairs",
      });
    }

    // Build WKT (Well Known Text) polygon string from coordinates
    const coordString = coordinates
      .map(([lng, lat]) => `${lng} ${lat}`)
      .join(", ");

    await prisma.$executeRaw`
      UPDATE area
      SET boundary = ST_SetSRID(
        ST_GeomFromText(${`POLYGON((${coordString}))`}),
        4326
      )
      WHERE name = ${name}
    `;

    await logTransaction(req);

    res.status(200).json({ success: true, message: "Area boundary updated" });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── Update region boundary ───────────────────────────────────────────────────
export const updateRegionBoundary = async (req, res) => {
  try {
    await logEvent(req);

    const { name } = req.params;
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 4) {
      return res.status(400).json({
        success: false,
        error:
          "coordinates must be an array of at least 4 [longitude, latitude] pairs",
      });
    }

    const coordString = coordinates
      .map(([lng, lat]) => `${lng} ${lat}`)
      .join(", ");

    await prisma.$executeRaw`
      UPDATE region
      SET boundary = ST_SetSRID(
        ST_GeomFromText(${`POLYGON((${coordString}))`}),
        4326
      )
      WHERE name = ${name}
    `;

    await logTransaction(req);

    res.status(200).json({ success: true, message: "Region boundary updated" });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── Get full map data (regions → areas → stations) ──────────────────────────
// Returns GeoJSON format — Leaflet reads this directly
export const getMapData = async (req, res) => {
  try {
    await logEvent(req);

    const regions = await prisma.$queryRaw`SELECT * FROM get_regions_geojson()`;
    const areas = await prisma.$queryRaw`SELECT * FROM get_areas_geojson()`;
    const stations = await prisma.$queryRaw`SELECT * FROM get_stations_geojson()`;

    // Build GeoJSON FeatureCollection — Leaflet standard format
    const toFeatureCollection = (items, geometryField, geometryType) => ({
      type: "FeatureCollection",
      features: items.map((item) => ({
        type: "Feature",
        geometry: item[geometryField],
        properties: {
          ...item,
          [geometryField]: undefined, // remove geometry from properties
        },
      })),
    });

    await logTransaction(req);

    res.status(200).json({
      success: true,
      data: {
        regions: toFeatureCollection(regions, "boundary", "Polygon"),
        areas: toFeatureCollection(areas, "boundary", "Polygon"),
        stations: toFeatureCollection(stations, "location", "Point"),
      },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};
