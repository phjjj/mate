import { NextResponse } from "next/server";
import connectMongoDB from "../../../_libs/mongodb";
import Chat from "../../../_models/chat";
import User from "../../../_models/user";

// 해당 채팅방 불러오기
export async function GET(req, res) {
  const { id } = res.params;

  await connectMongoDB();

  const chat = await Chat.findById(id);

  return NextResponse.json({ message: "Read Chat", messageList: chat.messageList }, { status: 201 });
}
