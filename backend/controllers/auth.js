const { userService } = require("../services/");

class AuthController {
  constructor() {
    this.service = userService;
  }
  async signup(req, res) {
    try {
      await this.service.signup(req.body);
      return res.status(201).send({ message: "Verification email send" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async verifyCode(req, res) {
    try {
      const { token, refreshToken } = await this.service.verifyCode(req.body);
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send({
        message: "Success",
        payload: `Bearer ${token}`,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async resendVerification(req, res) {
    try {
      await this.service.resendVerification(req.body);
      return res.status(200).send({ message: "verification email send" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async login(req, res) {
    try {
      const { refreshToken, token } = await this.service.login(req.body);
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send({
        message: "Login successful",
        payload: `Bearer ${token}`,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async forgotPassword(req, res) {
    try {
      await this.service.forgotPassword(req.body);
      return res.status(200).send({ message: "Resent code sent" });
    } catch (error) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async forgotPasswordUpdate(req, res) {
    try {
      const { token, refreshToken } = await this.service.forgotPasswordUpdate(
        req.body
      );
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({
        message: "Password updated successfully",
        payload: `Bearer ${token}`,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new AuthController();
