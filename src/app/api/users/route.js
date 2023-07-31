import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/user";

export async function POST(req, res) {
  const { name, kakaoId, email, profileImage } = await req.json();

  await connectMongoDB();
  const user = await User.create({
    name,
    kakaoId,
    email,
    profileImage,
  });

  return NextResponse.json({ message: "Crearted User", user }, { status: 201 });
}
