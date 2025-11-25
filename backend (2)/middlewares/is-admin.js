function isAdmin(req, res, next) {
  const { user } = req;
  if (user.role != "admin") {
    return res.status(409).send({ message: "User is not a admin" });
  }
  return next();
}

module.exports = isAdmin;
