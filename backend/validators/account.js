class AccountValidator {
  static configureAccount(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
    }
    if (userId.toString() == id) {
      return res.status(400).send({
        message: "Cannot access or change this account configurations",
      });
    }
    req.body = { id: id };
    next();
  }
  static search(req, res, next) {
    const { search } = req.query;
    if (!search || !search?.trim()) {
      return res.status(400).send({ message: "Missing search params..." });
    }
    next();
  }
  static getSpecAccount(req, res, next) {
    const { id } = req.params;
    if (!id || !id.trim()) {
      return res.status(400).send({ message: "Missing id" });
    }
    next();
  }
  static role(req, res, next) {
    const { id } = req.params;
    if (!id || !id?.trim()) {
      return res.status(400).send({ message: "Missing id" });
    }
    const userId = req.user._id;
    if (userId.toString() == id) {
      return res
        .status(400)
        .send({ message: "Cannot access or modify this account role" });
    }
    next();
  }
  static updatePassword(req, res, next) {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword?.trim() || !newPassword?.trim()) {
      return res.status(400).send({ message: "Missing fields" });
    }
    if (newPassword.length < 6) {
      return res
        .status(409)
        .send({ message: "Password must be at least 6 characters long" });
    }
    req.body = { oldPassword, newPassword, id: req.user._id };
    next();
  }
  static updateUsername(req, res, next) {
    const { username, password } = req.body;
    if (!username?.trim() || !password.trim() || password.length < 6) {
      return res.status(400).send({ message: "Missing fields" });
    }
    req.body = { username, password, id: req.user._id };
    next();
  }
  static updateAvatar(req, res, next) {
    const userId = req.user._id.toString();
    const { file } = req;
    req.body = { userId, filePath: file.path };
    next();
  }
}

module.exports = AccountValidator;
