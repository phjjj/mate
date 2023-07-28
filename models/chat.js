import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  chatName: { type: String, require: true },
  startPoint: { type: String, require: true },
  endPoint: { type: String, require: true },
  departureTime: { type: String, require: true },
  arrivalTime: { type: String, require: true },
  numberOfPeople: { type: Number, require: true, min: 1, max: 4 },
});

/*
  chatName: 채팅방 이름,
  startPoint: 출발지,
  endPoint: 도착지,
  departureTime: 출발시간,
  arrivalTime: 도착시간,
  numberOfPeople: 인원,
*/

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
