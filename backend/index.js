const express = require("express");
const cors = require("cors");

const env = require("./helpers/env.js");
const { disConnect } = require("./helpers/db.js");
const listen = require("./helpers/listen.js");

// swagger UI
const fs = require("fs");
const yaml = require("yaml");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = yaml.parse(fs.readFileSync("./swagger.yaml", "utf8"));
const setupSwagger = require("./helpers/swagger.js");

const authRouter = require("./routes/auth.js");
const emailRouter = require("./routes/email.js");
const countryRouter = require("./routes/country.js");
const accountRouter = require("./routes/account.js");
const adminRouter = require("./routes/admin.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/public", express.static("public"));

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/email", emailRouter);
app.use("/country", countryRouter);
app.use("/admin", adminRouter);
app.listen(env.APP_PORT, listen.bind(null, env.APP_PORT));

process.on("SIGINT", disConnect);
process.on("SIGTERM", disConnect);
