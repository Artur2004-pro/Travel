const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailApi = require("../lib/email-api.js");
const { User } = require("../models/");
const { createToken } = require("../helpers/jwt.js");

class AuthController {
  async signup(req, res) {
    const { username, password, email } = req.body;
    if (!password || password?.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }
    try {
      const hash = await bcrypt.hash(password, 10);
      const expires = new Date(Date.now() + 15 * 60 * 1000);
      const emailVerifyToken = crypto.randomUUID();
      const found = await User.findOne({ email: email });
      if (found) {
        return res.status(400).send({ message: "Email is already taken" });
      }
      const user = await User.create({
        email,
        username,
        password: hash,
        emailVerifyExpires: expires,
        emailVerifyToken,
      });

      const emailResult = await emailApi.verifyEmail(email, emailVerifyToken);
      if (!emailResult) {
        return res.status(500).send({ message: "Verification email failed" });
      }
      if (!emailResult.accepted.length) {
        return res.status(500).send({ message: "Verification email failed" });
      }
      return res
        .status(201)
        .send({ message: "Verification email send", userId: user._id });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async resendVerification(req, res) {
    const { email, password } = req.body;
    if (!password || !password?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    const found = await User.findOne({ email: email });
    if (!found) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    const verify = await bcrypt.compare(password, found.password);
    if (!verify) {
      res.status(404).send({ message: "Invalid email or password" });
    }
    if (found.emailVerified) {
      return res.status(409).send({ message: "Email is already verified" });
    }
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    const verifyToken = crypto.randomUUID();

    found.emailVerifyExpires = expires;
    found.emailVerifyToken = verifyToken;
    await found.save();
    await emailApi.verifyEmail(email, verifyToken);
    return res.status(200).send({ message: "verification email send" });
  }
  async login(req, res) {
    const { username, password } = req.body;

    const isEmail = this.isEmail(username);
    const user = isEmail
      ? await User.findOne({ email: username })
      : await User.findOne({ username });

    if (!user) {
      return res.status(404).send({
        message: `Invalid ${isEmail ? "email" : "username"} or password`,
      });
    }

    if (!user.emailVerified) {
      return res.status(409).send({ message: "Please verify your email" });
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(400).send({
        message: `Invalid ${isEmail ? "email" : "username"} or password`,
      });
    }
    const token = createToken({ id: user._id, role: user.role });

    res.status(200).send({
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  }
  async forgotPassword(req, res) {
    const { username } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).send({ message: "Invalid username" });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = crypto.randomUUID();
    user.forgotPasswordToken = token;
    user.forgotPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();
    await emailApi.forgotPassword(user.email, token);
    return res.status(200).send({ message: "Forgot password email sent" });
  }
  async ForgotPasswordUpdate(req, res) {
    const { password } = req.body;
    const { user } = req;
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (!password) {
      return res.status(404).send({ message: "Missing fields..." });
    }
    if (password.trim().length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    return res.status(200).send({ message: "Password updated successfully" });
  }
  isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

module.exports = new AuthController();
