const { disConnect } = require("./db.js");
const { redisDisconnect } = require("./redis.js");

async function stopConnection(server) {
  await disConnect(server);
  await redisDisconnect();
}
module.exports = stopConnection;
