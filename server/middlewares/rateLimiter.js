const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: "You have exceeded the 100 requests in 24 hrs limit!",
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: (req, res) => {
    if (req.ip === "192.168.43.59") return true;
    return false;
  },
});

//rate limit with redis
// const { createClient } = require('redis');
// const moment = require("moment") ;

// const redisClient = createClient();
// redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// const WINDOW_SIZE_IN_HOURS = 24;
// const MAX_WINDOW_REQUEST_COUNT = 100;
// const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

// export const customRedisRateLimiter = async (req, res, next) => {
//   try {
//     // Ensure Redis connection
//     await redisClient.connect();

//     // Get existing rate limit data for the user's IP
//     let record = await redisClient.get(req.ip);

//     const currentRequestTime = moment();

//     if (record == null) {
//       // If no record, create a new one
//       let newRecord = [{
//         requestTimeStamp: currentRequestTime.unix(),
//         requestCount: 1
//       }];
//       await redisClient.set(req.ip, JSON.stringify(newRecord));
//       next();
//       return; // Exit to avoid further processing
//     }

//     let data = JSON.parse(record);
//     let windowStartTimestamp = moment().subtract(WINDOW_SIZE_IN_HOURS, 'hours').unix();
//     let requestsWithinWindow = data.filter(entry => entry.requestTimeStamp > windowStartTimestamp);

//     let totalWindowRequestsCount = requestsWithinWindow.reduce((acc, entry) => acc + entry.requestCount, 0);

//     if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
//       // Rate limit exceeded
//       res.status(429).json({ error: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!` });
//       return; // Exit
//     } else {
//       // Update the record
//       let lastRequestLog = data[data.length - 1];
//       let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime.subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours').unix();

//       if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
//         lastRequestLog.requestCount++;
//         data[data.length - 1] = lastRequestLog;
//       } else {
//         data.push({
//           requestTimeStamp: currentRequestTime.unix(),
//           requestCount: 1
//         });
//       }

//       await redisClient.set(req.ip, JSON.stringify(data));
//       next();
//     }

//   } catch (error) {
//     next(error); // Pass errors to the error handling middleware
//   }
// };
