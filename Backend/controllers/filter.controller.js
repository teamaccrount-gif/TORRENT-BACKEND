import { groupByTag } from "../helpers/telemetryHelper.js";
import { prisma } from "../lib/prisma.js";
import { logError, logEvent, logTransaction } from "../services/logs.service.js";

export const getTags = async (req, res) => {
  try {
    await logEvent(req);

    const tag = await prisma.telemetryData.findMany();

    await logTransaction(req);

    res.status(200).json({ tag: tag });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getRawData = async (req, res) => {
  try {
    await logEvent(req);

    let { tags, start, end } = req.body;

    if (!tags || !start || !end) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const result = await prisma.$queryRaw`
      SELECT * FROM raw_filter_multi(
        ${tags}::text[],
        ${new Date(start)},
        ${new Date(end)}
      )
    `;

    const finalResult = groupByTag(result, "raw");

    await logTransaction(req);

    res.status(200).json(finalResult);
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

export const getAggrigationData = async (req, res) => {
  try {
    await logEvent(req);

    let { tags, start, end, interval } = req.body;

    if (!tags || !start || !end || !interval) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const result = await prisma.$queryRaw`
      SELECT * FROM agg_filter_multi(
        ${tags}::text[],
        ${new Date(start)},
        ${new Date(end)},
        ${interval}
      )
    `;

    const finalResult = groupByTag(result, "aggregation");

    await logTransaction(req);

    res.status(200).json(finalResult);
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

export const getDelta = async (req, res) => {
  try {
    await logEvent(req);

    let { tags, start, end, interval } = req.body;

    if (!tags || !start || !end || !interval) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    if (typeof tags === "string") {
      tags = JSON.parse(tags);
    }

    const result = await prisma.$queryRaw`
      SELECT * FROM delta_filter_multi(
        ${tags}::text[],
        ${new Date(start)},
        ${new Date(end)},
        ${interval}
      )
    `;

    const finalResult = groupByTag(result, "delta");

    await logTransaction(req);

    res.status(200).json(finalResult);
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ error: err.message });
    console.log(err);
  }
}

export const getLatestData = async (req, res) => {
  try {
    const { tags } = req.body;

    const data = await prisma.$queryRawUnsafe(`
      SELECT DISTINCT ON (td.id)
        td.tag,
        td.id AS telemetry_id,
        h.value,
        h.quality,
        h.timestamp
      FROM "TelemetryData" td
      JOIN "History" h 
        ON h.telemetry_id = td.id
      WHERE td.tag = ANY($1)
      ORDER BY td.id, h.timestamp DESC;
    `, tags);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};