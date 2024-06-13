const cron = require("node-cron");
const User = require("../model/User");

// Chạy cron job vào 00:00 hàng ngày
cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  const expiredUsers = await User.find({
    plan: { $ne: "default" },
    planExpirationDate: { $lte: now },
  });

  for (const user of expiredUsers) {
    user.plan = "default";
    user.planStartDate = null;
    user.planExpirationDate = null;
    await user.save();
  }
});
