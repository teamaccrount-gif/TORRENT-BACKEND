export const authorize = (requiredPermission) => (req, res, next) => {
  const { permissions, role } = req.user;

  // super_admin bypasses all permission checks
  if (role === "super_admin") return next();

  if (!permissions.includes(requiredPermission)) {
    return res.status(403).json({ success: false, error: "Access denied" });
  }

  next();
};