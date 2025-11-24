const { connect } = require("../db/db.js");

async function listen(port) {
  await connect();
  console.log("app started on http://localhost:" + port);
  console.log("swagger UI` http://localhost:" + port + "/api-docs");
}

module.exports = listen;
