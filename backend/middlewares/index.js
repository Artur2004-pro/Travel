const forgotPassword = require("./forgot-password.js");
const upload = require("./image-upload.js");
const isAdmin = require("./is-admin.js");
const isAuth = require("./is-authenticated.js");
const multerError = require("./error-middleware.js");

module.exports = {
  forgotPassword,
  upload,
  isAdmin,
  isAuth,
  multerError,
};
