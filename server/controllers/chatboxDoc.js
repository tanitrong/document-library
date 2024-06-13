const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const pdfParser = require("../utils/pdf-parser");
const ChatHistory = require("../model/historyChatBot");
const User = require("../model/User");
const Document = require("../model/Document");

dotenv.config();

const configuration = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = configuration.getGenerativeModel({ model: "gemini-pro" });

async function chatWithPdf(req, res) {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new ErrorHandler("User doesn't exists", 400));
  }
  try {
    const { docId, question } = req.body;
    const doc = await Document.findById(docId);
    if (!doc) {
      return next(new ErrorHandler("documment is not exsist", 400));
    }
    if (!doc || !question) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    let chatHistory = await ChatHistory.findOneAndUpdate(
      { userId: user._id, docId },
      { $push: { messages: { role: "user", content: question } } },
      { new: true, upsert: true }
    );
    if (!chatHistory.pdfContent) {
      chatHistory.pdfContent = await pdfParser.extractTextFromPdf(doc.pdfUrl);
      await chatHistory.save();
    }
    const recentMessages = chatHistory.messages.slice(-5);
    // Xây dựng prompt cho Gemini

    const prompt = `Document: ${doc.name}\nChat History: ${JSON.stringify(
      recentMessages
    )}\nContext: ${chatHistory.pdfContent}\nQuestion: ${question}\nAnswer:`;

    // Gọi Gemini để tạo câu trả lời
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    // Lưu câu trả lời vào lịch sử chat
    chatHistory.messages.push({ role: "assistant", content: answer });
    await chatHistory.save();

    res.json({ answer, chatHistory: chatHistory.messages, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getHistoryChatBot(req, res) {
  try {
    const { userId, docId } = req.params;
    if (!userId || !docId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const chatHistory = await ChatHistory.findOne({ userId, docId });
    if (!chatHistory) {
      return res.status(404).json({ error: "Chat history not found" });
    }

    res.json({ chatHistory: chatHistory.messages });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}
module.exports = { chatWithPdf, getHistoryChatBot };
