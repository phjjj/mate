import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Chat from "../../../../models/chat";

export async function POST(req, res) {
  const {
    chatName,
    startPoint,
    endPoint,
    departureTime,
    arrivalTime,
    numberOfPeople,
  } = await req.json();

  await connectMongoDB();
  await Chat.create({
    chatName,
    startPoint,
    endPoint,
    departureTime,
    arrivalTime,
    numberOfPeople,
  });

  return NextResponse.json({ message: "Crearted Chat" }, { status: 201 });
}
