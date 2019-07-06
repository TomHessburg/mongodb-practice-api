// pull in mongoose
const mongoose = require("mongoose");

// set up how you want the schema to look! You can include timestamps simply by adding
// the option as I did below.
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
      // "unique" will index a value in the database, giving it a O(1) lookup time
    },
    password: {
      type: String,
      required: true
      // minlength: 8,
      // maxlength: 40
    },
    info: {
      phone: {
        type: Number
      },
      location: {
        city: String,
        state: String,
        zip: Number,
        address: String
      }
    }
  },
  { timestamps: true }
);

// indexing

// a post could only have 1 user with the same username in this case
// this is something that I could definitely dig futher into.
// good indexing will dramatically improve performance,
// and I didnt really get a deep enough dive on that!
/*
user.index({
    username: 1,
    post: 1
},{ unique: true })
*/

// middleware / hooks / virtuals
// middleware and virtuals must be function syntax, not arrow functions for 'this' scope
user.pre("findById", function() {
  console.log("Im a hook that runs before finding a user by ID");
});
user.post("save", function() {
  console.log("Im a hook that runs after a user was saved");
});
user.post("find", function(doc, next) {
  setTimeout(() => {
    console.log("Im a fake asynchronous call that runs post finding a user.");
    next();
    // call next same way is normal express middleware. doc will also give reference
    // to the document to do stuff with if need be
  }, 200);
});
// virtuals wont show up up on the objects themselves, but will respond when called upon
user.virtual("fullAddress").get(function() {
  return `${this.address}, ${this.city} ${this.state} ${this.zip}`;
});

// Add the model and name it. Names should be singular!
const User = mongoose.model("user", user);

module.exports = User;
