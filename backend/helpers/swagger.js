const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const env = require("./env.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bardiner Travel API",
      version: "1.0.0",
      description: "API Documentation for Bardiner Travel backend",
    },
    servers: [
      {
        url: `http://localhost:${env.APP_PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./models/*.js"], // 🔥 Swagger կփնտրի JSDoc նշումներ
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
  console.log("📘 Swagger docs available at /api-docs");
}

module.exports = setupSwagger;
