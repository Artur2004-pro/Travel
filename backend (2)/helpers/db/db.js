const mongoose = require("mongoose");
const env = require("../utilities/env.js");

async function connect() {
  try {
    await mongoose.connect(`${env.MONGO_URI}/${env.APP_NAME}`, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.kill(process.pid);
  }
}

async function disConnect(server, redis) {
  try {
    await mongoose.disconnect();
    console.log("mongodb disconnected successfully");
    server.close();
  } catch (error) {
    console.error("Dissconnect failed...", error.message);
    server.close();
    process.kill(process.pid);
  }
}

module.exports = { connect, disConnect };
