// base imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const mongoose = require("mongoose");

// server instantiation and middleware
const server = express();
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));

//routes

// connect to db and listen
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/referencedb", {
    useNewUrlParser: true
  });
};

const port = process.env.PORT || 5000;
connect()
  .then(async connection => {
    server.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
