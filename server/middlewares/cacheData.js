// require("dotenv").config();
// const Redis = require("ioredis");

// const redisClient = new Redis(process.env.REDIS_URL);

// redisClient.on("connect", function () {
//   console.log("Connected to Redis Cloud");
// });

// redisClient.on("error", function (error) {
//   console.error("Error connecting to Redis Cloud:", error);
// });
// const cacheMiddleware = async (req, res, next) => {
//   const cacheKey = "allDoc";

//   try {
//     const cachedData = await redisClient.get(cacheKey);
//     if (cachedData) {
//       return res.status(200).json({
//         success: true,
//         cache: true,
//         documents: JSON.parse(cachedData),
//       });
//     }

//     console.log("Fetching data from database");
//     next();
//   } catch (error) {
//     console.error("Error fetching data from cache:", error);
//     next(error);
//   }
// };
// module.exports = { redisClient, cacheMiddleware };

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 });
const cacheMiddleware = async (req, res, next) => {
  try {
    const cachedData = cache.get("allDoc");
    if (cachedData) {
      return res.status(200).json({
        success: true,
        cache: true,
        documents: cachedData,
      });
    }

    console.log("Fetching data from database");
    next();
  } catch (error) {
    console.error("Error fetching data from cache:", error);
    next(error);
  }
};

module.exports = { cacheMiddleware, cache };
