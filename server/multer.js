// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const filename = file.originalname.split(".")[0];
//     if (file.mimetype === "application/pdf") {
//       cb(null, filename + ".pdf");
//     } else {
//       cb(null, filename + "-" + uniqueSuffix + ".png");
//     }
//   },
// });
// //
// const fileFilter = function (req, file, cb) {
//   const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
//   const fileExtension = file.originalname.split(".").pop().toLowerCase();

//   if (!allowedExtensions.includes(fileExtension)) {
//     return cb(new Error("Only image and PDF files are allowed!"));
//   }

//   cb(null, true);
// };

// const limits = {
//   fileSize: 20 * 1024 * 1024, // 5 MB
// };
// exports.upload = multer({ storage: storage, fileFilter, limits });
// middlewares/multer.js
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
