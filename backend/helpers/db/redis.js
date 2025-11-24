const Redis = require("ioredis");
const env = require("../utilities/env.js");

const redis = new Redis(env.REDIS_URI);

redis.on("connect", () => console.log("🟢 Redis connected"));
redis.on("error", (err) => console.error("🔴 Redis connection error:", err));

async function disConnect(redis) {
  try {
    console.log("⚙️ Closing Redis connection...");
    await redis.quit();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error disconnecting Redis:", err);
    process.exit(1);
  }
}
const redisDisconnect = disConnect.bind(null, redis);

module.exports = { redis, redisDisconnect };
