require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// const validator = require("express-validator");

const router = require("./routes/index");

const { API_ENDPOINT_NOT_FOUND_ERR } = require("./utils/constant");

const server = express();

server.use("/uploads", express.static(path.join(__dirname, "/uploads")));

server.use(cors());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());

server.use(router);

// Page not found error handling middleware

server.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

//Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, (err, data) => {
  if (err) {
    console.log("not able to connect !");
  } else {
    console.log("mongoose connected !");
  }
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

server.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
