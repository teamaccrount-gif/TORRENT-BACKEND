export const applyLevelAccess = (req, res, next) => {
  const { role, level, regions, areas, stations } = req.user;

  // super_admin bypasses level entirely
  if (role === "super_admin") {
    req.accessFilter = {};
    return next();
  }

  if (!level) {
    return res.status(403).json({ success: false, error: "No level access assigned" });
  }

  switch (level) {
    case "region":
      req.accessFilter = {
        region: { in: regions },
        ...(areas.length > 0 && { area: { in: areas } }),
      };
      break;

    case "area":
      req.accessFilter = {
        area: { in: areas },
      };
      break;

    case "station":
      if (!stations || stations.length === 0) {
        return res.status(403).json({ success: false, error: "No station access assigned" });
      }
      req.accessFilter = {
        station: { in: stations },
      };
      break;

    default:
      return res.status(403).json({ success: false, error: "Invalid level access" });
  }

  next();
};