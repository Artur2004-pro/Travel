const {
  randomNumbers,
  createToken,
  createRefreshToken,
  handleError,
  deleteImage,
} = require("../helpers");
const emailApi = require("../lib/email-api");
const { User, Country, City } = require("../models");
const { ErrorHandler, ServiceError } = require("./error-handler.js");
const bcrypt = require("bcrypt");

class UserService {
  static ignoreFields = [
    "-password",
    "-emailVerifyExpires",
    "-emailVerifyToken",
    "-forgotPasswordToken",
    "-forgotPasswordExpires",
    "-forgotUsernameToken",
    "-forgotUsernameExpires",
  ];
  static hashSalt = 10;
  // auth controller
  async signup(data) {
    try {
      const { email, password } = data;
      const emailVerifyExpires = new Date(Date.now() + 15 * 60 * 1000);
      const emailVerifyToken = randomNumbers(6);
      const hash = await bcrypt.hash(password, UserService.hashSalt);
      const newUserData = {
        ...data,
        password: hash,
        emailVerifyExpires,
        emailVerifyToken,
      };
      const user = await User.create(newUserData);
      const emailResult = await emailApi.verifyEmail(email, emailVerifyToken);
      if (!emailResult) {
        throw new ServiceError("Verification email is failed", 500);
      }
      const userObj = user.toObject();
      UserService.ignoreFields.forEach((field) => delete userObj[field]);
      return userObj;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async verifyCode(data) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) throw new ServiceError(`Invalid email or password`, 401);

      const itsOk = await bcrypt.compare(data.password, user.password);
      if (!itsOk) {
        throw new ServiceError(`Invalid email or password`, 401);
      }
      const now = Date.now();
      if (now > user.emailVerifyExpires) {
        throw new ServiceError("Verification code expired", 409);
      }
      if (data.code != user.emailVerifyToken) {
        throw new ServiceError("Invalid token", 400);
      }
      user.emailVerifyExpires = null;
      user.emailVerifyToken = null;
      user.emailVerified = true;
      await user.save();
      const jwtPayload = { id: user._id, role: user.role };
      const token = createToken(jwtPayload);
      const refreshToken = createRefreshToken(jwtPayload);
      return { token: token, refreshToken: refreshToken };
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async resendVerification(data) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw new ServiceError("Invalid email or password", 400);
      }
      const itsOk = await bcrypt.compare(data.password, user.password);
      if (!itsOk) {
        throw new ServiceError("Invalid email or password", 400);
      }
      if (user.emailVerified) {
        throw new ServiceError("Email is already verified", 409);
      }
      const emailVerifyExpires = new Date(Date.now() + 15 * 60 * 1000);
      const emailVerifyToken = randomNumbers(6);
      user.emailVerifyExpires = emailVerifyExpires;
      user.emailVerifyToken = emailVerifyToken;
      await user.save();
      const emailResult = await emailApi.verifyEmail(
        user.email,
        emailVerifyToken,
      );
      if (!emailResult) {
        throw new ServiceError("Verification email is failed", 500);
      }
      return user;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async login(data) {
    const message = data.username ? "username" : "email";
    try {
      const user = data.username
        ? await User.findOne({ username: data.username })
        : await User.findOne({ email: data.email });
      if (!user) {
        throw new ServiceError(`Invalid ${message} or password`, 400);
      }
      if (!user.emailVerified) {
        throw new ServiceError("Email is not a verified", 400);
      }
      const itsOk = await bcrypt.compare(data.password, user.password);
      if (!itsOk) {
        throw new ServiceError(`Invalid ${message} or password`, 400);
      }
      const token = createToken({ id: user._id, role: user.role });
      const refreshToken = createRefreshToken({
        id: user._id,
        role: user.role,
      });
      return { token: token, refreshToken: refreshToken };
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }

  async forgotPassword(data) {
    const { email } = data;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new ServiceError("User not found", 404);
      }
      if (!user.emailVerified) {
        throw new ServiceError("User email is not verified", 409);
      }
      const code = randomNumbers(6);
      user.forgotPasswordToken = code;
      user.forgotPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();

      const emailResult = await emailApi.forgotPassword(email, code);
      if (!emailResult) {
        throw new ServiceError("Verification email failed", 500);
      }
      return user;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async forgotPasswordUpdate(data) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) throw new ServiceError("User not found", 404);

      const now = Date.now();
      if (now > user.forgotPasswordExpires) {
        throw new ServiceError("code time expired", 400);
      }
      if (data.code != user.forgotPasswordToken) {
        throw new ServiceError("Invalid access code", 400);
      }
      const hash = await bcrypt.hash(data.password, UserService.hashSalt);
      user.password = hash;
      user.forgotPasswordToken = null;
      user.forgotPasswordExpires = null;
      await user.save();
      const token = createToken({ id: user._id, role: user.role });
      const refreshToken = createRefreshToken({
        id: user._id,
        role: user.role,
      });
      return { token: token, refreshToken: refreshToken };
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }

  // account controller

  async configureAccount(data) {
    try {
      const account = await User.findById(data.id);
      if (!account) throw new ServiceError("Account not found", 404);
      account.isBlocked = !account.isBlocked;
      await account.save();
      return account;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async search(data) {
    try {
      const { search, page = 1, limit = 20 } = data || {};
      if (!search || typeof search !== "string") return [];
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const l = Math.min(limit, 100);
      const skip = (Math.max(1, page) - 1) * l;
      const users = await User.find({
        username: { $regex: escaped, $options: "i" },
      })
        .select(UserService.ignoreFields)
        .limit(l)
        .skip(skip);
      return users || [];
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getSpecAccount(data) {
    try {
      const account = await User.findById(data.id).select(
        UserService.ignoreFields,
      );
      if (!account) {
        throw new ServiceError("Account not found", 404);
      }
      return account;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async role(data) {
    try {
      const account = await User.findById(data.id);
      if (!account) {
        throw new ServiceError("Account not found", 404);
      }
      if (!account.emailVerified) {
        throw new ServiceError("Account Email is not verified", 409);
      }
      account.role = account.role == "admin" ? "user" : "admin";
      await account.save();
      return account;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async updatePassword(data) {
    try {
      const user = await User.findById(data.id);
      if (!user) {
        throw new ServiceError("User not found", 404);
      }
      const itsOk = await bcrypt.compare(data.oldPassword, user.password);
      if (!itsOk) {
        throw new ServiceError("Invalid password", 400);
      }
      const hash = await bcrypt.hash(data.newPassword, UserService.hashSalt);
      user.password = hash;
      await user.save();
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async updateUsername(data) {
    try {
      const account = await User.findById(data.id);
      if (!account) {
        throw new ServiceError("Invalid data", 404);
      }
      const itsOk = await bcrypt.compare(data.password, account.password);
      if (!itsOk) {
        throw new ServiceError("Invalid password", 400);
      }
      if (account.username == data.username) {
        throw new ServiceError("username already exists", 409);
      }
      account.username = data.username;
      await account.save();
      return account;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getAccount(data) {
    try {
      const account = await User.findById(data.id).select(
        UserService.ignoreFields,
      );
      if (!account) {
        throw new ServiceError("Account not found", 404);
      }
      return account;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async updateAvatar(data) {
    try {
      const { userId, file } = data;
      const found = await User.findById(userId).select(
        UserService.ignoreFields,
      );
      if (!found) {
        throw new ServiceError("User not found", 404);
      }
      await deleteImage(found.avatar || []);
      found.avatar = file.path;
      await found.save();
      return found;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  // admin controller
  async beAdmin(data) {
    try {
      const user = await User.findById(data.id).select(
        UserService.ignoreFields,
      );
      if (!user) {
        throw new ServiceError("User not found", 404);
      }
      user.role = "admin";
      await user.save();
      return user;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getStatistics() {
    try {
      const countries = await Country.countDocuments();
      const cities = await City.countDocuments();
      const admins = await User.countDocuments({ role: "admin" });
      const users = await User.countDocuments({ role: "user" });
      return { countries, cities, admins, users };
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new UserService();
