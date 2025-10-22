const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email already taken"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is already exists"],
    unique: true,
  },
  password: { type: String, required: [true, "please fill password"] },
  avatar: { type: String },
  emailVerifyed: { type: Boolean, default: false },
  emailVerifyExpires: { type: Date },
  emailVerifyToken: { type: String },
  forgotPasswordToken: { type: String },
  forgotPasswordExpires: { type: Date },
  forgotUsernameToken: { type: String },
  forgotUsernameExpires: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
