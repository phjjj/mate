import express from "express";
const router = express.Router();

router.post("/chat", async (req, res) => {
  // get message 클라이언트에서 받은 body 저장
  const message = req.body;
  console.log(req.body);
  // dispatch to channel "message" 서버로 message 내용을 보내기
  // 첫 번째 인수는 이벤트 이름, 두 번째 인수는 전송될 데이터
  res?.socket?.server?.io?.emit("message", message);

  console.log(res.socket.server.io);
  // return message;
  res.status(201).json(message);
});

export default router;
