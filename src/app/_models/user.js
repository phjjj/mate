import mongoose, { Schema } from "mongoose";
import Chat from "./chat";

const userSchema = new Schema({
  kakaoId: { type: Number, require: true },
  name: { type: String, required: true },
  email: { type: String },
  profileImage: { type: String },
  chatList: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
});

// 회원 탈퇴 할시 해당 채팅 목록 지워준다.
userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Chat.deleteMany({
      host: {
        $eq: doc.name,
      },
    });
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
