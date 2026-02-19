const { sendSuccess } = require("../helpers/utilities/api-response");
const { postService } = require("../services/");

class PostController {
  constructor() {
    this.service = postService;
  }
  async add(req, res) {
    const data = req.validated || req.body || {};
    const post = await this.service.add(data);
    return sendSuccess(res, post);
  }
  async delete(req, res) {
    const data = req.validated || req.params || {};
    const deleted = await this.service.delete(data);
    return sendSuccess(res, deleted);
  }
  async like(req, res) {
    const data = req.validated || req.body || {};
    const message = await this.service.toggleLike(data);
    return sendSuccess(res, message);
  }
  async update(req, res) {
    const data = req.validated || req.body || {};
    const post = await this.service.update(data);
    return sendSuccess(res, post);
  }
  async deletePhoto(req, res) {
    const data = req.validated || req.body || {};
    const post = await this.service.deletePhoto(data);
    return sendSuccess(res, post);
  }
  async getAll(req, res) {
    const posts = await this.service.getAll(req.user._id);
    return sendSuccess(res, posts);
  }
  async getById(req, res) {
    const data = req.validated || req.params || {};
    const post = await this.service.getById(data.id);
    return sendSuccess(res, post);
  }
}

module.exports = new PostController();
