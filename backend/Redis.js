const Redis = require("redis");
const redisClient = Redis.createClient();

(async () => {
  try {
    await redisClient.connect();
    console.log("redis connected");
  } catch (error) {
    console.log(`Redis error : ${error}`);
  }
})();

module.exports = redisClient;
