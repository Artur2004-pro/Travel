const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../helpers/env.js");
const emailApi = require("../lib/email-api.js");
const { User } = require("../models/");

class AuthController {
  async signup(req, res) {
    const { username, password, email } = req.body;
    if (!this.isEmailSyntax(email)) {
      res.status(400).send({ message: "Invalid email syntax" });
    }
    if (!password.trim() || password.trim().length < 6) {
      return res.status(400).send({ message: "please enter longest password" });
    }
    if (!this.isEmailSyntax(email)) {
      return res.status(400).send({ message: "Invalid email syntax" });
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
      return res
        .status(201)
        .send({ message: "veryfication email send", userId: user._id });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  async resendVerification(req, res) {
    const { username, email, password } = req.body;
    const found = await User.findOne({ email: email });
    if (!found) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    const verify = await bcrypt.compare(password, found.password);
    if (!verify) {
      res.status(404).send({ message: "Invalid email or password" });
    }
    if (found.emailVerifyed) {
      return res.status(409).send({ message: "Email is already taken" });
    }
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    const verifyToken = crypto.randomUUID();

    found.emailVerifyExpires = expires;
    found.emailVerifyToken = verifyToken;
    found.username = username;
    await found.save();
    await emailApi.verifyEmail(email, verifyToken);
    return res.status(200).send({ message: "verification email send" });
  }
  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "Invalid username or password" });
    }
    if (!user.emailVerifyed) {
      return res.status(409).send({ message: "please verify your email" });
    }
    const verify = bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(404).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({ message: "login success", token });
  }
  async forgotPassword(req, res) {
    const { username } = req.body;
    if (!username.trim()) {
      return res.status(400).send({ message: "Invalid username" });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = crypto.randomUUID();
    user.forgotToken = token;
    user.forgotPasswordToken = token;
    user.forgotPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();
    await emailApi.forgotPassword(user.email, token);
    return res.status(200).send({ message: "forgot password email sned" });
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
      return res.status(400).send({ message: "please enter longest password" });
    }
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    return res.status(200).send({ message: "password upadted successfuly" });
  }
  isEmailSyntax(email) {
    this.isEmailSyntax.regExp ??=
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.isEmailSyntax.regExp.test(email);
  }
}

module.exports = new AuthController();
