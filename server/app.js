// import module
import express from "express";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";

const app = express();
const PORT = 3000;

// use middleware
app.use(cors());

// created server
const server = http.createServer(app);

// created io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001",
    mathods: ["GET", "POST"],
  },
});

// io connect
io.on("connection", (socket) => {
  console.log("A User Connected!!");
  socket.on("send-message", (obj) => {
    io.emit("receive-message", obj);
  });
});

// express server listen
server.listen(PORT, () => {
  console.log(`Server Listen on Port ${PORT} ✅`);
});
