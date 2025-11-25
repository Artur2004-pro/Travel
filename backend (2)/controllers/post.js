const { postService } = require("../services/");

class PostController {
  constructor() {
    this.service = postService;
  }
  async add(req, res) {
    try {
      const post = await this.service.add(req.body);
      return res
        .status(201)
        .send({ message: "Post created successfully", payload: post });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const deleted = await this.service.delete(req.body);
      return res
        .status(200)
        .send({ message: "Post deleted successfully", payload: deleted });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.meesage });
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
  async update(req, res) {
    try {
      const post = await this.service.update(req.body);
      return res
        .status(200)
        .send({ message: "Post Updated successfully", payload: post });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.meesage });
    }
  }
  async deletePhoto(req, res) {
    try {
      const post = await this.service.deletePhoto(req.body);
      return res
        .status(200)
        .send({ message: "image deleted successfully", payload: post });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.meesage });
    }
  }
}

module.exports = new PostController();
