import { NextResponse } from "next/server";
import connectMongoDB from "../../../_libs/mongodb";
import Chat from "../../../_models/chat";
import User from "../../../_models/user";

// 해당 채팅방 불러오기
export async function GET(req, res) {
  const { id } = res.params;

  await connectMongoDB();

  const chat = await Chat.findById(id);
  return NextResponse.json({ message: "Read Chat", messageList: chat.messageList, title: chat.title }, { status: 201 });
}

// 채팅방 멤버 추가하가
export async function PATCH(req, res) {
  const { id } = res.params;
  const { memberId } = await req.json();

  const member = await User.findById(memberId);

  await connectMongoDB();

  // 멤버 참여했는지 확인 해준다.
  const findChat = await Chat.find({ _id: id, member: { $in: member } });

  if (findChat.length === 0) {
    const chat = await Chat.findByIdAndUpdate(id, { $push: { member: member } });
    return NextResponse.json({ message: "Added Chat Member", status: 201, isChatRoom: false });
  }

  return NextResponse.json({ message: "이미 다른 채팅방에 참여하고 있습니다", status: 201, isChatRoom: true });
}
