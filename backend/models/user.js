const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String },
    emailVerified: { type: Boolean, default: false },
    emailVerifyExpires: { type: Date },
    emailVerifyToken: { type: String },
    forgotPasswordToken: { type: String },
    forgotPasswordExpires: { type: Date },
    forgotUsernameToken: { type: String },
    forgotUsernameExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
