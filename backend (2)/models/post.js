const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    images: [{ type: String }],
    title: {
      type: String,
      trim: true,
      required: [true, "Post title is required"],
    },
    content: {
      type: String,
      trim: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: [true, "Missing city id"],
    },
  },
  { timestamps: true }
);

postSchema.statics.toggleLike = async function (userId, postId) {
  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new Error("Invalid user id");
  if (!mongoose.Types.ObjectId.isValid(postId))
    throw new Error("Invalid post id");

  const post = await this.findById(postId);
  if (!post) throw new Error("Post not found");

  const index = post.likes.findIndex((id) => id.equals(userId));
  if (index > -1) {
    post.likes.splice(index, 1);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return post.likes.some((id) => id.equals(userId)) ? "Liked" : "Unliked";
};

module.exports = mongoose.model("Post", postSchema);
