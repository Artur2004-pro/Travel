const { Comment, Post } = require("../models/");
class CommentController {
  async add(req, res) {
    const userId = req.user._id;
    const { id } = req.params;
    const { contnet } = req.body;
    if (!id || !contnet?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const comment = await Comment.create({
        user: userId,
        post: id,
        content: contnet,
      });
      return res
        .status(200)
        .send({ message: "Comment added successfully", payload: comment });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).send({ message: "Comment not found" });
      }
      const post = await Post.findById(comment.post);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      const access =
        post.author == userId ||
        userId == comment.user ||
        req.user.role == "admin";
      if (!access) {
        return res.status(409).send({ message: "Cannot access!" });
      }
      await comment.deleteOne();
      return res.status(200).send({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async like(req, res) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    try {
      const message = await Comment.toggleLike(userId, id);
      return res.status(200).send({ message });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
}

module.exports = new CommentController();
