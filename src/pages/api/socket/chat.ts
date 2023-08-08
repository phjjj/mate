import { NextApiResponseServerIO } from "@/types/next";
import { NextApiRequest } from "next";

const chat = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    console.log("post");
    // get message 클라이언트에서 받은 body 저장
    const message = req.body;

    // dispatch to channel "message" 서버로 message 내용을 보내기
    // 첫 번째 인수는 이벤트 이름, 두 번째 인수는 전송될 데이터
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};

export default chat;
