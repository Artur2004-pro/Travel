const { commentService } = require("../services");

class CommentController {
  constructor() {
    this.service = commentService;
  }
  async add(req, res) {
    try {
      const comment = await this.service.add(req.body);
      return res
        .status(200)
        .send({ message: "Comment added successfully", payload: comment });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const comment = await this.service.delete(req.body);
      return res
        .status(200)
        .send({ message: "Comment deleted successfully", payload: comment });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async like(req, res) {
    try {
      const message = await this.service.toggleLike(req.body);
      return res.status(200).send({ message });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new CommentController();
