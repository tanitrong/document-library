const express = require("express");
const path = require("path");
const { app, server } = require("./socket/socket");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const helmet = require("helmet");
const docRoute = require("./routes/document");
const paymentRoute = require("./routes/payment");
const messageRoute = require("./routes/message");
const ErrorHandler = require("./middlewares/error");
const rateLimiterUsingThirdParty = require("./middlewares/rateLimiter");
require("./jobs/cronjob");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("Error connecting to Mongo", err);
  });

//middleware
// app.use(rateLimiterUsingThirdParty);
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dtdoc.vercel.app"],
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(express.json({ limit: "70mb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "70mb",
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/doc", docRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/payment", paymentRoute);

app.use(ErrorHandler);
//create  server
server.listen(process.env.PORT, (req, res) => {
  console.log("server listening on port", process.env.PORT);
});
//trong da ghe den
