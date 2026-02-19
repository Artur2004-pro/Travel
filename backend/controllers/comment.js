const { sendSuccess } = require("../helpers/utilities/api-response");
const { commentService } = require("../services");

class CommentController {
  constructor() {
    this.service = commentService;
  }
  async add(req, res) {
    const data = req.validated || req.body || {};
    const comment = await this.service.add(data);
    return sendSuccess(res, comment);
  }
  async delete(req, res) {
    const data = req.validated || req.params || {};
    const comment = await this.service.delete(data);
    return sendSuccess(res, comment);
  }
  async like(req, res) {
    const data = req.validated || req.body || {};
    const message = await this.service.toggleLike(data);
    return sendSuccess(res, message);
  }
}

module.exports = new CommentController();
