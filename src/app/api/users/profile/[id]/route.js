import { NextResponse } from "next/server";
import connectMongoDB from "../../../../_libs/mongodb";
import User from "../../../../_models/user";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await connectMongoDB();
    const user = await User.findById(id);

    return NextResponse.json({ message: "Get User", user }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectMongoDB();
    const user = await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Delete User" }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const {
      data: { carImage, intro },
    } = await req.json();

    await User.findByIdAndUpdate(id, {
      introduction: {
        carImage,
        intro,
      },
    });

    return NextResponse.json({ message: "Update Profile" }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
