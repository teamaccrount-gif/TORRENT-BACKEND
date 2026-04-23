export const authorize = (requiredPermission) => (req, res, next) => {
  const { permissions, role } = req.user;

  if (role === "super_admin") return next();

  if (!permissions.includes(requiredPermission)) {
    return res.status(403).json({ success: false, error: "Access denied" });
  }

  next();
};