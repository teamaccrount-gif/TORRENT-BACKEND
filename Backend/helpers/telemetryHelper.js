export function groupByTag(result, type) {
  const grouped = {};

  result.forEach(item => {
    if (!grouped[item.tag]) {
      grouped[item.tag] = {
        tag: item.tag,
        telemetry_id: item.telemetry_id,
        data: []
      };
    }

    let dataPoint = {};

    if (type === "raw") {
      dataPoint = {
        timestamp: item.timestamp,
        value: item.value,
        quality: item.quality
      };
    }

    if (type === "aggregation") {
      dataPoint = {
        bucket: item.bucket,
        avg: item.avg,
        max: item.max,
        min: item.min,
        std_dev: item.std_dev
      };
    }

    if (type === "delta") {
      dataPoint = {
        bucket: item.bucket,
        avg: item.avg,
        delta: item.delta
      };
    }

    grouped[item.tag].data.push(dataPoint);
  });

  return Object.values(grouped);
}