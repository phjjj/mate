// import module
import express from "express";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";

import bodyParser from "body-parser";
const app = express();

const PORT = 3001;
app.use(bodyParser.json()); //json타입
app.use(bodyParser.urlencoded({ extended: true })); //post방식의 encoding
// use middleware
app.use(cors());

// created server
const server = http.createServer(app);

// created io
const io = socketIO(server, {
  cors: {
    origin: "*",
    mathods: ["GET", "POST"],
  },
});

// io connect
io.on("connect", (socket) => {
  console.log("A User Connected!!");
  const roomId = socket.handshake.auth.id;
  socket.join(roomId);

  socket.to(roomId).emit("join");

  socket.on("message", (message) => {
    socket.to(roomId).emit("message", message);
  });
});

//* 클라이언트로 메세지 송신

// express server listen
server.listen(PORT, () => {
  console.log(`Server Listen on Port ${PORT} ✅`);
});

// 1. 네임스페이스로 연결 시켜줌, 우리는 필요한 네임스페이스가 하나밖에없어서  디폴트값인 "/" 자동 연결
// 2. 방마다 roomId 사용, 이거는 각 채팅방 _id를 넘겨서 받아서 join
