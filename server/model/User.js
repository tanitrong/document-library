const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumerber: {
    type: Number,
  },
  address: {
    type: String,
  },
  career: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  balance: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  plan: {
    type: String,
    enum: ["default", "basic", "saving", "value", "premium"],
    default: "default",
  },
  planStartDate: {
    type: Date,
  },
  planExpirationDate: {
    type: Date,
  },
  purchasedDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],

  avatar: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//methods for schema
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
