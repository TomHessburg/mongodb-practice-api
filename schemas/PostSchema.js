const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      minlength: 3
    },
    content: {
      type: String,
      required: true,
      maxlength: 280
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("post", post);

module.exports = Post;
