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
  } catch (error) {
    return null;
  }
}

function refreshToken() {}

module.exports = { createToken, verifyToken, refreshToken };
