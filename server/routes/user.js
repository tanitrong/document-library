const express = require("express");
const {
  createUser,
  activateUser,
  login,
  getUser,
  logout,
  getUserInfo,
  getAllUsers,
  changePassword,
  updateProfile,
  forgotPassword,
  getInfoPlan,
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const upload = require("../multer");
const catchAsyncError = require("../middlewares/catchAsyncErrors");

router.post("/create-user", upload.single("avatar"), createUser);
router.post("/activation", catchAsyncError(activateUser));
router.post("/login-user", catchAsyncError(login));
router.get("/get-user", isAuthenticated, catchAsyncError(getUser));
router.get("/get-all-user", isAuthenticated, catchAsyncError(getAllUsers));
router.get("/user-info/:id", catchAsyncError(getUserInfo));
router.put("/change-password", catchAsyncError(changePassword));
router.put("/update-profile", catchAsyncError(updateProfile));
router.get("/get-info-plan/:id", catchAsyncError(getInfoPlan));

router.get("/logout", catchAsyncError(logout));
module.exports = router;
