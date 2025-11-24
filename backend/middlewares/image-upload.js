const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

function ensureDirExistence(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("public", req.baseUrl);
    ensureDirExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + crypto.randomUUID() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: undefined,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
