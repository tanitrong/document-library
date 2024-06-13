const express = require("express");
const { sendMessage, getMessage } = require("../controllers/message");
const { isAuthenticated } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const router = express.Router();

router.get("/:id", isAuthenticated, catchAsyncErrors(getMessage));
router.post("/send/:id", isAuthenticated, catchAsyncErrors(sendMessage));

module.exports = router;
