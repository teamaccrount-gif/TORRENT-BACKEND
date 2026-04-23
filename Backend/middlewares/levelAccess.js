// Level access rules:
// super_admin  → no filter, sees everything
// admin        → region scoped, optionally limited to specific areas
// manager      → region scoped, optionally limited to specific areas and stations
// engineer     → single station only
// operator     → single station only

export const applyLevelAccess = (req, res, next) => {
  const { role, level, regions, areas, stations } = req.user;

  if (role === "super_admin") {
    req.accessFilter = {};
    return next();
  }

  switch (role) {
    case "admin":
      // region scoped — optionally limited to specific areas
      req.accessFilter = {
        region: { in: regions },
        ...(areas.length > 0 && { area: { in: areas } }),
      };
      break;

    case "manager":
      // region scoped — optionally limited to specific areas and stations
      req.accessFilter = {
        region: { in: regions },
        ...(areas.length > 0    && { area:    { in: areas    } }),
        ...(stations.length > 0 && { station: { in: stations } }),
      };
      break;

    case "engineer":
    case "operator":
      // single station only
      if (!stations || stations.length === 0) {
        return res.status(403).json({ success: false, error: "No station access assigned" });
      }
      req.accessFilter = {
        station: { in: stations },
      };
      break;

    default:
      return res.status(403).json({ success: false, error: "No level access assigned" });
  }

  next();
};