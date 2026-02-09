const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { multerError, errorMiddleware } = require("./middlewares/");

const { env, stopConnection, listen, setupSwagger } = require("./helpers/");

// swagger UI
const fs = require("fs");
const yaml = require("yaml");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = yaml.parse(fs.readFileSync("./swagger.yaml", "utf8"));

// Routers
const router = require("./routes/");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://172.20.10.2:5173",
      "http://192.168.65.106:5173",
      "http://192.168.34.151:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

setupSwagger(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/public", express.static("public"));

app.use("/auth", router.auth);
app.use("/account", router.account);
app.use("/country", router.country);
app.use("/admin", router.admin);
app.use("/city", router.city);
app.use("/posts", router.post);
app.use("/commetns", router.comment);
app.use("/metadata", router.metadata);
app.use("/trip", router.trip);
app.use("/trip-day", router.tripDay);
app.use("/activity", router.tripActivity);
const server = app.listen(env.APP_PORT, listen.bind(null, env.APP_PORT));

app.use(multerError);
app.use(errorMiddleware);

process.on("SIGINT", stopConnection.bind(null, server));
process.on("SIGTERM", stopConnection.bind(null, server));
