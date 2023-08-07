import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";

export async function GET(req, { params }) {
  const { kakaoId } = params;

  await connectMongoDB();
  const user = await User.findOne({
    kakaoId,
  });

  return NextResponse.json({ message: "Signed User", user }, { status: 201 });
}
