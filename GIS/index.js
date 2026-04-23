import "dotenv/config";
import express from "express";
import cors from "cors";

import gisRoutes from "./routers/gis.routes.js";

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/map", gisRoutes);

app.listen(PORT, () => {
  console.log(`GIS Service running on http://localhost:${PORT}`);
});