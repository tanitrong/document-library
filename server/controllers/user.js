const User = require("../model/User");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const { userValidator } = require("../utils/validators");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = async (fileBuffer) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${fileBuffer.toString("base64")}`,
      {
        folder: "avatars",
      }
    );
    return result.secure_url;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      return next(new ErrorHandler("user already exists", 400));
    }
    let avatarUrl;
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.buffer);
    }

    const user = {
      name,
      email,
      password,
      avatar: avatarUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `https://dtdoc.vercel.app/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please activate your account by click on the link to activate your account ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "15m",
  });
};

//activate user
module.exports.activateUser = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("invalid activation", 400));
    }
    const { name, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("user already exists", 400));
    }
    user = await User.create({ name, email, password, avatar });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// login user
module.exports.login = async (req, res, next) => {
  try {
    // const { error } = userValidator.validate(req.body);
    // if (error) {
    //   return next(new ErrorHandler(error.details[0].message, 400));
    // }
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// load user
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//change password
module.exports.changePassword = async (req, res, next) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare old password
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    // Hash and update new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//update Profile
module.exports.updateProfile = async (req, res, next) => {
  const { userId, newProfileData } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, newProfileData, {
      new: true,
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all users
module.exports.getAllUsers = async (req, res, next) => {
  const { status } = req.query;
  const loggedInUserId = req.user._id;
  let filter = {};

  status === "All" ? "" : (filter.status = status);
  //test
  // if (status && status !== "All") {
  //   filter.status = status;
  // }
  try {
    const users = await User.find({
      _id: { $ne: loggedInUserId },
      ...filter,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
// get user info
module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// log out user
module.exports.logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get infor plan
module.exports.getInfoPlan = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id,
      "plan planStartDate planExpirationDate"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ infoPlan: user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
