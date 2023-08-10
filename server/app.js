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
    origin: "http://localhost:3000",
    mathods: ["GET", "POST"],
  },
});

// io connect
io.on("connect", (socket) => {
  console.log("A User Connected!!");
  //* 클라이언트로부터 메시지 수신

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

//* 클라이언트로 메세지 송신

// express server listen
server.listen(PORT, () => {
  console.log(`Server Listen on Port ${PORT} ✅`);
});
