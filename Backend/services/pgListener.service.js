import pkg from "pg";
import { sendToSubscribers } from "../socket/socket.service.js";

const { Client } = pkg;

export const startPgListener = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  await client.query("LISTEN telemetry_channel");

  console.log("Listening to PostgreSQL notifications...");

  client.on("notification", (msg) => {
    const data = JSON.parse(msg.payload);

    // 🔥 Send only to subscribed users
    sendToSubscribers(data);
  });
};