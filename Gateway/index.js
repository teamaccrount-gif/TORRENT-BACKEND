import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app  = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "*" }));

// GIS service — proxied to port 3001
app.use(
  "/api/v1/gis",
  createProxyMiddleware({
    target:      process.env.GIS_SERVICE_URL,
    changeOrigin: true,
  })
);

// Everything else — proxied to main backend port 3000
app.use(
  "/api/v1",
  createProxyMiddleware({
    target:      process.env.MAIN_SERVICE_URL,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway running");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});