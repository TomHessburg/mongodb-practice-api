// base imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const { authenticate } = require("./auth/restrictedMiddleware.js");
// import routes
const usersRouter = require("./routes/usersRouter.js");
const postsRouter = require("./routes/postsRouter.js");
const authRouter = require("./routes/authRouter.js");

// users schema, just using this on connection, not necessary
const User = require("./schemas/UserSchema.js");

// server instantiation and middleware
const server = express();
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));

//routes
server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/posts", authenticate, postsRouter);

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
