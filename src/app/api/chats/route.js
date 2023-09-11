import { NextResponse } from "next/server";
import connectMongoDB from "../../_libs/mongodb";
import Chat from "../../_models/chat";
import User from "../../_models/user";

// created Chat
export async function POST(req, res) {
  const { title, departures, destination, departuresTime, destinationTime, people, id } = await req.json();

  await connectMongoDB();

  const user = await User.findById(id);

  const chat = await Chat.create({
    title,
    departures,
    destination,
    departuresTime,
    destinationTime,
    people,
    host: user,
    member: [],
    messageList: [],
  });

  await User.findByIdAndUpdate(id, { chatList: [...user.chatList, chat._id] });

  return NextResponse.json({ message: "Crearted Chat" }, { status: 201 });
}

export async function GET(req, res) {
  await connectMongoDB();

  const chat = await Chat.find({}).populate("host");

  return NextResponse.json({ message: "Read All Chat", chats: chat }, { status: 201 });
}

// 채팅 업데이트
export async function PATCH(req, res) {
  const { id, messageList } = await req.json();

  await connectMongoDB();

  const chat = await Chat.findById(id);

  const updatedMessageList = [...chat.messageList, messageList];

  const updateChat = await Chat.findByIdAndUpdate(id, { messageList: updatedMessageList }).populate("messageList.user");

  return NextResponse.json(
    { message: "Updated Chat Message List", messageList: updateChat.messageList },
    { status: 201 }
  );
}

export async function DELETE(req, res) {
  const { chatId } = await req.json();

  await connectMongoDB();

  const deletedChat = await Chat.findByIdAndDelete(chatId);

  return NextResponse.json({ message: "ChatList DELETE" }, { status: 201 });
}
