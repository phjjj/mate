import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../_libs/mongodb";
import Chat from "../../../_models/chat";
import User from "../../../_models/user";

// 해당 채팅방 불러오기
export async function GET(req, res) {
  const { id } = res.params;

  await connectMongoDB();

  const chat = await Chat.findById(id);
  return NextResponse.json(
    { message: "Read Chat", messageList: chat.messageList, title: chat.title, host: chat.host },
    { status: 201 }
  );
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

// 방 나갈때 member에서 빼기
export async function DELETE(req, res) {
  // 유저아이디
  const { userId } = await req.json();
  // 방 아이디
  console.log(userId);
  const { id } = res.params;

  await connectMongoDB();
  // 호스트 아이디 호스트가 없을 때 toString()으로 변환하면 오류 생겨서 호스트가 null일 경우 null로 반환
  const { host } = await Chat.findById(id, "host");
  const hostId = host ? host.toString() : null;

  // 나가는 유저가 호스트 일 경우
  // host = null로 변환
  if (hostId === userId) {
    await Chat.findByIdAndUpdate(id, { $set: { host: null } });
    // 유저 chatList에서 방 아이디 빼기
    await User.findByIdAndUpdate(hostId, { $pull: { chatList: { $in: id } } });
  } else {
    await Chat.findByIdAndUpdate(id, { $pull: { member: { $in: userId } } });
  }

  return NextResponse.json({ message: "방 나가기", status: 201 });
}
