import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma.js";
import { logError, logEvent, logTransaction } from "../services/logs.service.js";

export const getRoles = async (req, res) => {
  try {
    await logEvent(req);

    const callerRole = req.user.role;

    const excludedRoles = ["super_admin"];

    if (callerRole === "admin") {
      excludedRoles.push("admin"); 
    }

    const roles = await prisma.role.findMany({
      where: {
        name: { notIn: excludedRoles },
      },
      select: { id: true, name: true },
    });

    await logTransaction(req);

    res.status(200).json({ success: true, data: roles });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    await logEvent(req);

    const { first_name, last_name, email, password, phone, role_id, level, regions, areas, stations } = req.body;

    if (!first_name || !last_name || !email || !password || !role_id || !level) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone,
        role_id,
        access: {
          create: {
            level,
            regions:  regions  || [],
            areas:    areas    || [],
            stations: stations || [],
          },
        },
      },
      include: { role: true, access: true },
    });

    await logTransaction(req);

    res.status(201).json({
      success: true,
      data: {
        id:     user.id,
        full_name: `${user.first_name} ${user.last_name}`,
        email:  user.email,
        phone:  user.phone,
        role:   user.role.name,
        access: user.access,
      },
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    await logEvent(req);

    const users = await prisma.user.findMany({
      select: {
        id:         true,
        first_name: true,
        last_name:  true,
        email:      true,
        phone:      true,
        is_active:  true,
        created_at: true,
        role:       { select: { name: true } },
        access:     true,
      },
    });

    await logTransaction(req);

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    await logEvent(req);

    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id:         true,
        first_name: true,
        last_name:  true,
        email:      true,
        phone:      true,
        is_active:  true,
        created_at: true,
        role:       { select: { name: true } },
        access:     true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    await logTransaction(req);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    await logEvent(req);

    const { id } = req.params;

    const { first_name, last_name, email, password, phone, role_id, is_active, level, regions, areas, stations } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        first_name,
        last_name,
        email,
        password,
        phone,
        role_id,
        is_active,
        access: {
          update: {
            level,
            regions:  regions  || [],
            areas:    areas    || [],
            stations: stations || [],
          },
        },
      },
      include: { role: true, access: true },
    });

    await logTransaction(req);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await logEvent(req);

    const { id } = req.params;
    const userId = parseInt(id);

    // ✅ First delete dependent records
    await prisma.refreshToken.deleteMany({
      where: { user_id: userId }
    });

    await prisma.userAccess.deleteMany({
      where: { user_id: userId }
    });

    // ✅ Then delete user
    await prisma.user.delete({
      where: { id: userId }
    });

    await logTransaction(req);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    await logError(req, err);
    res.status(500).json({ success: false, error: err.message });
  }
};