import { prisma } from "../lib/prisma.js";

function getUserInfo(req, userOverride = {}) {
  return {
    user_id: userOverride.user_id ?? req.user?.user_id ?? null,
    email:   userOverride.email   ?? req.user?.email   ?? null,
    role:    userOverride.role    ?? req.user?.role     ?? null,
  };
}

// Used by EventLog and ErrorLog — both have user_agent
function getFullRequestInfo(req) {
  return {
    endpoint:   `http://localhost:3000${req.originalUrl}`,
    method:     req.method,
    ip_address: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || null,
    user_agent: req.headers["user-agent"] || null,
    request_id: req.requestId ?? null,
  };
}

// Used by TransactionLog — no user_agent column in schema
function getBaseRequestInfo(req) {
  return {
    endpoint:   `http://localhost:3000${req.originalUrl}`,
    method:     req.method,
    ip_address: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || null,
    request_id: req.requestId ?? null,
  };
}

export const logEvent = async (req, userOverride = {}) => {
  try {
    await prisma.eventLog.create({
      data: {
        ...getUserInfo(req, userOverride),
        ...getFullRequestInfo(req),
        params: req.body || req.query || req.params,
      },
    });
  } catch (err) {
    console.error("EventLog error:", err.message);
  }
};

export const logTransaction = async (req, userOverride = {}) => {
  try {
    await prisma.transactionLog.create({
      data: {
        ...getUserInfo(req, userOverride),
        ...getBaseRequestInfo(req),
      },
    });
  } catch (err) {
    console.error("TransactionLog error:", err.message);
  }
};

export const logError = async (req, err, userOverride = {}) => {
  try {
    await prisma.errorLog.create({
      data: {
        ...getUserInfo(req, userOverride),
        ...getFullRequestInfo(req),
        error: err.message,
      },
    });
  } catch (logErr) {
    console.error("ErrorLog error:", logErr.message);
  }
};