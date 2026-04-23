import { Server } from "socket.io";

let io;
const userSubscriptions = new Map(); // socket.id -> Set(telemetry_ids)

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ SUBSCRIBE (merge instead of replace)
    socket.on("subscribeTags", (telemetryIds) => {
      const existing = userSubscriptions.get(socket.id) || new Set();

      telemetryIds.forEach(id => existing.add(id));

      userSubscriptions.set(socket.id, existing);
    });

    // ✅ UNSUBSCRIBE
    socket.on("unsubscribeTags", (telemetryIds) => {
      const current = userSubscriptions.get(socket.id);

      if (!current) return;

      telemetryIds.forEach(id => current.delete(id));

      if (current.size === 0) {
        userSubscriptions.delete(socket.id);
      } else {
        userSubscriptions.set(socket.id, current);
      }
    });

    // ✅ DISCONNECT
    socket.on("disconnect", () => {
      userSubscriptions.delete(socket.id);
      console.log("User disconnected:", socket.id);
    });
  });
};

// ✅ SEND ONLY TO SUBSCRIBED USERS
export const sendToSubscribers = (data) => {
  for (let [socketId, ids] of userSubscriptions.entries()) {
    if (ids.has(data.telemetry_id)) {
      io.to(socketId).emit("telemetry_update", data);
    }
  }
};