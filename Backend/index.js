import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";

import filterRoutes from "./routers/filter.routes.js";
import tableRoutes from "./routers/table.routes.js";
import authRoutes from "./routers/auth.routes.js";
import userRoutes from "./routers/user.routes.js";
import { initSocket } from "./socket/socket.service.js";
import { startPgListener } from "./services/pgListener.service.js";
import { ensurePartitionsExist, startPartitionCron } from "./services/partition.service.js";
import dashboardRoutes from "./routers/dashboard.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use("/filter", filterRoutes);
app.use("/tables", tableRoutes);
app.use("/auth",  authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);

initSocket(server);
startPgListener();
await ensurePartitionsExist();
startPartitionCron();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});