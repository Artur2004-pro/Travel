class PostValidator {
  static getById(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.params = { id };
    next();
  }
  static add(req, res, next) {
    const { id } = req.params;
    const { files } = req;
    const { title, content, hashtags } = req.body;
    if (!files?.length || !title?.trim() || !content?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    const userId = req.user._id;
    const images = files.map((file) => file.path);
    req.body = { images, cityId: id, title, content, userId, hashtags };
    next();
  }
  static delete(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const { role } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { id, userId, role };
    next();
  }
  static like(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing post id" });
    }
    req.body = { postId: id, userId };
    next();
  }
  static update(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    const { files } = req;
    const { title, content } = req.body;
    if (!files?.length && !title?.trim() && !content?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    const images = files && files.length ? files.map((file) => file.path) : [];
    const cont = content || "";
    const tit = title || "";

    req.body = { id, images, title: tit, userId, content: cont };
    next();
  }
  static deletePhoto(req, res, next) {
    const { filename } = req.query;
    const { id } = req.params;
    const userId = req.user._id.toString();
    const { role } = req.user;
    if (!filename || !id) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    req.body = { filename, id, userId, role };
    next();
  }
}
module.exports = PostValidator;
