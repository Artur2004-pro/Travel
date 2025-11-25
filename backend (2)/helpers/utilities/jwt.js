const jwt = require("jsonwebtoken");
const env = require("./env.js");

function createToken(payload) {
  const token = jwt.sign({ ...payload }, env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}
function verifyToken(token) {
  try {
    const data = jwt.verify(token, env.JWT_SECRET);
    return data;
  } catch {
    return null;
  }
}
function createRefreshToken(payload) {
  const token = jwt.sign({ ...payload }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

function verifyRefresh(token) {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefresh,
};
