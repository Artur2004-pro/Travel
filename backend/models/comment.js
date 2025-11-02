const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

commentSchema.statics.toggleLike = async function (userId, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid comment id");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }
  const res = await this.findOneAndUpdate(
    { _id: id },
    [
      {
        $set: {
          likes: {
            $cond: [
              { $in: [userId, "$likes"] },
              { $setDifference: [userId, "$likes"] },
              { $concatArrays: [userId, "$likes"] },
            ],
          },
        },
      },
    ],
    { new: true }
  );
  if (!res) {
    throw new Error("Comment not found");
  }
  const liked = res.likes.some((like) => like.equals(userId));
  return liked ? "Liked" : "Unliked";
};

module.exports = mongoose.model("Comment", commentSchema);
