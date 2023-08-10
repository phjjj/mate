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

  //* 클라이언트로부터 메시지 수신

  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

//* 클라이언트로 메세지 송신

// express server listen
server.listen(PORT, () => {
  console.log(`Server Listen on Port ${PORT} ✅`);
});

// 1. namespace 만들기(생략) 하나밖에 필요없어서 디폴트인 "io" 사용

// 2. roomId 만들기 roomId는 chats._id

// 3. socekt.to(roomId).on("message", (message)=>{...})으로 만들기

// 4.
