// io 서버
import { NextApiResponseServerIO } from "@/types/next";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const io = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    console.log(`New Socket.io server... to ${path}`);
    // Next의 넷 서버를 http 서버에 적용
    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: { origin: "https://mate-git-develop-phjjj.vercel.app" },
    });

    // Next.js 소켓 서버 응답에 SocketIO 서버 추가
    res.socket.server.io = io;
  }
  res.end();
};

export default io;
