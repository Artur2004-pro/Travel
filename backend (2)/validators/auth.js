const { User } = require("../models/");
const isEmail = require("./isEmail.js");

class AuthValidator {
  static async signup(req, res, next) {
    const { username, password, email } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).send({ message: "Username is required" });
    }
    if (!email || !isEmail(email)) {
      return res.status(400).send({ message: "Valid email is required" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }
    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res
          .status(409)
          .send({ message: "Username or email already exists" });
      }
      req.body = { password, username, email };
      next();
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  static login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).send({ message: "Username or email is required" });
    }
    if (!password || !password.trim()) {
      return res.status(400).send({ message: "Password is required" });
    }
    const isMail = isEmail(username);
    const key = isMail ? "email" : "username";
    const validatedData = { password, [key]: username };
    req.body = validatedData;
    next();
  }

  static verifyCode(req, res, next) {
    const { code, email, password } = req.body;
    if (!code || !email || !password) {
      return res
        .status(400)
        .send({ message: "Code, email and password are required" });
    }
    if (!isEmail(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }
    req.body = { code, email, password };
    next();
  }

  static forgotPassword(req, res, next) {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!isEmail(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }
    req.body = { email };
    next();
  }

  static forgotPasswordUpdate(req, res, next) {
    const { email, password, code } = req.body;
    if (!isEmail(email)) {
      return res.status(400).send({ message: "Invalid email syntax" });
    }
    if (!code || !code.trim) {
      return res.status(400).send({ message: "Missing verify code" });
    }
    if (!password || password.trim().length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }
    req.body = { password, email, code };
    next();
  }

  static resendVerification(req, res, next) {
    const { email, password } = req.body;
    if (!isEmail(email) || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }
    req.body = { email, password };
    next();
  }
}

module.exports = AuthValidator;
