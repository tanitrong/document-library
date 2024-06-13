const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: {
    type: String,
    required: true,
  },
  messages: [
    {
      timestamp: { type: Date, default: Date.now },
      role: { type: String, enum: ["user", "assistant"], required: true },
      content: { type: String, required: true },
    },
  ],
});

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = ChatHistory;
