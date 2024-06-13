const ErrorHandler = require("../utils/ErrorHandler");
const Conversation = require("../model/Conversation");
const Message = require("../model/Message");
const { getReceiverSocketId, io } = require("../socket/socket");
module.exports.sendMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    // socket io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { id: userTochatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userTochatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(201).json(messages);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
