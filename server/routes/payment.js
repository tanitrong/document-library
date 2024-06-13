const router = require("express").Router();
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  updatePaymentForUser,
  getInfoPayment,
  withDraw,
  getWithDraw,
  updateDepositsForUser,
  getAllWithDraw,
} = require("../controllers/payment");

router.get("/transactions", catchAsyncError(getAllWithDraw));
router.post("/:userId", catchAsyncError(updatePaymentForUser));
router.post("/deposits/:userId", catchAsyncError(updateDepositsForUser));
router.get("/:userId", catchAsyncError(getInfoPayment));
router.post("/withdraw/:userId", catchAsyncError(withDraw));
router.get("/withdraw/:userId", catchAsyncError(getWithDraw));
module.exports = router;
