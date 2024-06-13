const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  nameBank: {
    type: String,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Failed", "Processing"],
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
