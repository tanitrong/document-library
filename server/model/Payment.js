const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidContent: {
    type: String,
    required: true,
  },
  paymentMedthod: {
    type: String,
    default: "QRCode",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
