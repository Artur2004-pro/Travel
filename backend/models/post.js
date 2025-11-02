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

postSchema.statics.toggleLike = async function (userId, id) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid post id");
  }
  const res = await this.findOneAndUpdate(
    { _id: id },
    [
      {
        $set: {
          $likes: {
            $cond: [
              { $in: [userId, "$likes"] },
              { $setDifferent: [userId, "$likes"] },
              { $concatArrays: "$likes" },
            ],
          },
        },
      },
    ],
    { new: true }
  );
  if (!res) {
    throw new Error("Post not found");
  }
  const liked = res.likes.some((like) => like.equal(userId));
  return liked ? "Liked" : "Unliked";
};

module.exports = mongoose.model("Post", postSchema);
