export function isUnrestricted(accessFilter) {
  return Object.keys(accessFilter).length === 0;
}

export function inClause(filterValue) {
  if (!filterValue) return undefined;
  return { in: filterValue.in };
}

export function checkAccess(res, accessFilter) {
  if (accessFilter === null || accessFilter === undefined) {
    res.status(403).json({ success: false, error: "No level access assigned" });
    return false;
  }
  return true;
}

export function isEntityAccessible(filter, filterKey, entityValue) {
  if (isUnrestricted(filter)) return true;
  if (!filter[filterKey]) return true; // no restriction on this key
  return filter[filterKey].in.includes(entityValue);
}