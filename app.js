const express = require("express");
const cors = require("cors");
const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ApikeyRouter = require("./Router/ApikeyRouter");
const TokenRouter = require("./Router/TokenRouter");
const MainRouter = require("./Router/MainRouter");

//Load static files
app.use("/public", express.static(__dirname + "/public"));

app.use(cors());

console.log(process.env.JWT_EXPIRATION);

//Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Base route Routes
app.use("/portalapi/v1/apikey", ApikeyRouter);
app.use("/portalapi/v1/token", TokenRouter);
app.use("/portalapi/v1/api", MainRouter);
app.get("/health_check", (req, res) => res.status(200).send("Ok"));
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello EBS !!!!" });
});

// app.use("*", (req, res, next) => {
//   next(new ErrorHandler(`Can't resolve ${req.originalUrl}`, false, "e500"));
// });

module.exports = app;
