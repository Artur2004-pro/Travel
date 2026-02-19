const { sendSuccess } = require("../helpers/utilities/api-response");
const { userService } = require("../services/");
const { env } = require("../helpers");

class AuthController {
  constructor() {
    this.service = userService;
  }
  async signup(req, res) {
    const data = req.validated || req.body || {};
    await this.service.signup(data);
    return sendSuccess(res, { message: "Verification email send" });
  }
  async verifyCode(req, res) {
    const data = req.validated || req.body || {};
    const { token, refreshToken } = await this.service.verifyCode(data);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return sendSuccess(res, {
      message: "Success",
      payload: `Bearer ${token}`,
    });
  }
  async resendVerification(req, res) {
    const data = req.validated || req.body || {};
    await this.service.resendVerification(data);
    return sendSuccess(res, { message: "verification email send" });
  }
  async login(req, res) {
    const data = req.validated || req.body || {};
    const { refreshToken, token } = await this.service.login(data);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return sendSuccess(res, {
      message: "Login successful",
      payload: `Bearer ${token}`,
    });
  }
  async forgotPassword(req, res) {
    const data = req.validated || req.body || {};
    await this.service.forgotPassword(data);
    return sendSuccess(res, { message: "Resent code sent" });
  }
  async forgotPasswordUpdate(req, res) {
    const data = req.validated || req.body || {};
    const { token, refreshToken } = await this.service.forgotPasswordUpdate(
      data,
    );
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return sendSuccess(res, {
      message: "Password updated successfully",
      payload: `Bearer ${token}`,
    });
  }
}

module.exports = new AuthController();
