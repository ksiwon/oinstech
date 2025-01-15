const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: [String], // 학생과 강사 ID를 저장
      required: true,
    },
    messages: [
      {
        from: { type: String, required: true }, // 보낸 사람
        to: { type: String, required: true },   // 받는 사람
        message: { type: String, required: true }, // 메시지 내용
        timestamp: { type: Date, default: Date.now }, // 메시지 시간
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
