const Withdraw = require("../model/Withdraw");
const User = require("../model/User");
const ErrorHandler = require("../utils/ErrorHandler");
const Payment = require("../model/Payment");
const { default: mongoose } = require("mongoose");
module.exports.updatePaymentForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount, paidContent, paymentMedthod } = req.body;

    const user = await User.findById(userId);
    if (!user) next(new ErrorHandler("User not found", 400));
    const newPayment = new Payment({
      userId,
      amount,
      paidContent,
      paymentMedthod,
    });
    await newPayment.save();
    //cap nhat dang ki goi
    let planType;
    if (amount == 5000) planType = "basic";
    if (amount == 6000) planType = "saving";
    if (amount == 60000) planType = "value";
    if (amount == 90000) planType = "premium";
    let monthPlan;
    if (planType == "basic") monthPlan = 1;
    if (planType == "saving") monthPlan = 3;
    if (planType == "value") monthPlan = 6;
    if (planType == "premium") monthPlan = 12;
    user.plan = planType;
    user.planStartDate = new Date();
    const expirationDate = new Date(user.planStartDate);
    expirationDate.setMonth(expirationDate.getMonth() + monthPlan);
    user.planExpirationDate = expirationDate;

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Payment sent successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
module.exports.updateDepositsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount, paidContent, paymentMedthod } = req.body;

    const user = await User.findById(userId);
    if (!user) next(new ErrorHandler("User not found", 400));
    const newPayment = new Payment({
      userId,
      amount,
      paidContent,
      paymentMedthod,
    });
    await newPayment.save();
    user.balance = amount;
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Deposits sent successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
//get info payment with user id
// module.exports.getInfoPayment = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const getAlltransactions = await Payment.find({ userId });
//     const result = await Payment.aggregate([
//       { $match: { userId: new mongoose.Types.ObjectId(userId) } },
//       { $group: { _id: "$userId", totalAmount: { $sum: "$amount" } } },
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       { $unwind: "$user" },
//       {
//         $project: {
//           totalAmount: 1,
//           plan: "$user.plan",
//           planExpirationDate: "$user.planExpirationDate",
//           planStartDate: "$user.planStartDate",
//         },
//       },
//     ]);
//     if (result.length > 0) {
//       res
//         .status(200)
//         .json({ allTransactions: getAlltransactions, result: result[0] });
//     } else {
//       res.status(404).json({ message: "No data found" });
//     }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };
module.exports.getInfoPayment = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await Payment.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$userId",
          totalAmount: { $sum: "$amount" },
          transactions: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          totalAmount: 1,
          plan: "$user.plan",
          planExpirationDate: "$user.planExpirationDate",
          planStartDate: "$user.planStartDate",
          transactions: 1,
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json({ result: result[0] });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports.withDraw = async (req, res, next) => {
  const { userId } = req.params;
  const { nameBank, accountNo, nameUser, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) next(new ErrorHandler("User not found", 400));
    if (amount < 50000) {
      return next(new ErrorHandler("Số tiền rút tối thiểu là 50000đ", 400));
    }
    if (amount > user.balance) {
      return next(new ErrorHandler("Số tiền bạn rút vượt quá số dư", 400));
    }
    user.balance -= amount;
    const newWithdraw = new Withdraw({
      userId,
      nameBank,
      accountNo,
      amount,
      nameUser,
    });

    await user.save();
    await newWithdraw.save();

    res.status(200).json({
      success: "true",
      message: "Yêu cầu đã được gửi đi.",
      balance: user.balance,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get transaction withdraw for user

module.exports.getWithDraw = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const getWithDraw = await Withdraw.find({ userId });
    if (getWithDraw.length < 1)
      next(new ErrorHandler("Bạn chưa có giao dịch nào!!!", 400));

    res.json(getWithDraw);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
//get all transaction withdraw

module.exports.getAllWithDraw = async (req, res, next) => {
  try {
    const getWithDraw = await Withdraw.find();
    res.json(getWithDraw);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
