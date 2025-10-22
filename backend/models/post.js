const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Post image is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
