class CommentValidator {
  static add(req, res, next) {
    const userId = req.user._id.toString();
    const { postId: id } = req.params;
    const { content } = req.body;
    if (!id || !content?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    req.body = { userId, id, content };
    next();
  }
  static delete(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const { role } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { userId, id, role };
    next();
  }
  static like(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { id, userId };
    next();
  }
}

module.exports = CommentValidator;
