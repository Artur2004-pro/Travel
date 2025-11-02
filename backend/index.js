const express = require("express");
const cors = require("cors");

const { env, disConnect, listen, setupSwagger } = require("./helpers/");

// swagger UI
const fs = require("fs");
const yaml = require("yaml");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = yaml.parse(fs.readFileSync("./swagger.yaml", "utf8"));

// Routers
const router = require("./routes/");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/public", express.static("public"));

app.use("/auth", router.auth);
app.use("/account", router.account);
app.use("/email", router.email);
app.use("/country", router.country);
app.use("/admin", router.admin);
app.use("/city", router.city);
app.use("/posts", router.post);
app.use("/commetns", router.comment);
app.listen(env.APP_PORT, listen.bind(null, env.APP_PORT));

process.on("SIGINT", disConnect);
process.on("SIGTERM", disConnect);
