import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Chat from "../../../../models/chat";
import User from "../../../../models/user";

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
    host: user.name,
    chatPeople: [],
  });

  await User.findByIdAndUpdate(id, { chatList: [...user.chatList, chat._id] });

  return NextResponse.json({ message: "Crearted Chat" }, { status: 201 });
}

export async function GET(req, res) {
  await connectMongoDB();

  const chat = await Chat.find({});

  return NextResponse.json({ message: "Read All Chat", chats: chat }, { status: 201 });
}
