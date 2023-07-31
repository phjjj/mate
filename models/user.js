import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  kakaoId: { type: Number, require: true },
  name: { type: String, required: true },
  email: { type: String },
  profileImage: { type: String },
  chatList: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
