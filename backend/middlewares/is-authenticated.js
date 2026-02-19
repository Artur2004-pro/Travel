const { User } = require("../models/");
const {
  verifyToken,
  verifyRefresh,
  createRefreshToken,
  createToken,
  env,
} = require("../helpers/");

async function isAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }

  const accessToken = authorization.split(" ")[1];
  let payload = verifyToken(accessToken);
  if (!payload) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).send({ message: "Refresh token missing" });
    }

    const { id, role } = verifyRefresh(refreshToken);
    if (!id) {
      return res.status(401).send({ message: "Session expired, login again" });
    }

    // Preserve any existing JWT fields (role, id) when rotating refresh token
    const newRefresh = createRefreshToken({ id, role });

    res.cookie("refresh_token", newRefresh, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    payload = { id, role };
  }

  const { id } = payload;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  req.user = user;
  next();
}

module.exports = isAuth;
