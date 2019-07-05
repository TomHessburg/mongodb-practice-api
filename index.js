// base imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const mongoose = require("mongoose");

const User = require("./schemas/UserSchema.js");

// server instantiation and middleware
const server = express();
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));

//routes

// connect to db and listen
const connect = () => {
  // the connect method returns a promise,
  // also must make sure to pass "useNewUrlParser: true" to get
  // rid of that deprication warning.
  return mongoose.connect("mongodb://localhost:27017/referencedb", {
    useNewUrlParser: true
  });
};

const port = process.env.PORT || 5000;
connect()
  .then(async connection => {
    const users = await User.find({}).exec();
    server.listen(port, () => {
      console.log(
        `Server listening on ${port}, and there are currently ${
          users.length
        } users in the database!`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
