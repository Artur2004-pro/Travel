const { Comment, Post } = require("../models/index.js");
const { ServiceError, ErrorHandler } = require("./error-handler.js");

class CommentService {
  async add(data) {
    try {
      const { id, userId, content } = data;
      const comment = await Comment.create({
        user: userId,
        post: id,
        content: content,
      });
      return comment;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async delete(data) {
    try {
      const { userId, id, role } = data;
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new ServiceError("Comment not found", 404);
      }
      const post = await Post.findById(comment.post);
      if (!post) {
        throw new ServiceError("Post not found", 404);
      }
      const access =
        post.author == userId || userId == comment.user || role == "admin";
      if (!access) {
        throw new ServiceError("Cannot access of modify this comment", 409);
      }
      await comment.deleteOne();
      return comment;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async toggleLike(data) {
    try {
      const { userId, id } = data;
      return await this.Service.toggleLike(userId, id);
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new CommentService();
