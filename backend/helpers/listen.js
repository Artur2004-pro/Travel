const { connect } = require("./db.js");

async function listen(port) {
    await connect();
    console.log("app started on http://localhost:" + port);
}

module.exports = listen;