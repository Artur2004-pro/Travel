const express = require("express");
const cors = require("cors");

const env = require("./helpers/env.js");
const { disConnect } = require("./helpers/db.js");
const listen = require("./helpers/listen.js");

const authRouter = require("./routes/auth.js");
const emailRouter = require("./routes/email.js");

const { verify } = require("./lib/email-api.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/email", emailRouter);

app.get("/verify-email", verify);

app.listen(env.APP_PORT, listen.bind(null, env.APP_PORT));

process.on("SIGINT", disConnect);
process.on("SIGTERM", disConnect);
