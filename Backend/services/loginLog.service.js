import { UAParser } from "ua-parser-js";
import { prisma } from "../lib/prisma.js";

// Fetch approximate location from IP using free ip-api.com
// Returns null if IP is local or lookup fails
async function getLocationFromIp(ip) {
  try {
    // Skip lookup for localhost IPs
    if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168")) {
      return null;
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status`);
    const data = await response.json();

    if (data.status !== "success") return null;

    return `${data.city}, ${data.regionName}, ${data.country}`;
  } catch {
    return null;
  }
}

export async function logLogin({ req, email, user_id = null, status, failure_reason = null }) {
  try {
    const ip        = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || null;

    // Parse browser, OS, device from user agent string
    const parser     = new UAParser(userAgent);
    const parsed     = parser.getResult();
    const browser    = parsed.browser.name    ? `${parsed.browser.name} ${parsed.browser.version ?? ""}`.trim() : null;
    const os         = parsed.os.name         ? `${parsed.os.name} ${parsed.os.version ?? ""}`.trim()          : null;
    const deviceType = parsed.device.type     ?? "desktop"; // ua-parser returns undefined for desktop

    await prisma.loginLog.create({
      data: {
        user_id,
        email,
        status,
        failure_reason,
        ip_address:  ip        ?? null,
        user_agent:  userAgent ?? null,
        browser,
        os,
        device_type: deviceType,
        request_id:  req.requestId ?? null,
      },
    });
  } catch (err) {
    // Login log failure should never crash the auth flow
    console.error("Login log error:", err.message);
  }
}