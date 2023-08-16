import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  title: { type: String, required: true },
  departures: { type: String, required: true },
  destination: { type: String, required: true },
  departuresTime: { type: String, required: true },
  destinationTime: { type: String, required: true },
  people: { type: Number, required: true, min: 1, max: 5 },
  host: { type: Schema.Types.ObjectId, ref: "User" },
  member: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messageList: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      message: String,
      createdAt: String,
    },
  ],
  createdAt: String,
});

/*
  chatName: 채팅방 이름,
  startPoint: 출발지,
  endPoint: 도착지,
  departureTime: 출발시간,
  arrivalTime: 도착시간,
  numberOfPeople: 인원,
*/

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
