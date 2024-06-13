const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      default: [],
    },
  ],
});
module.exports = mongoose.model("Collection", collectionSchema);
