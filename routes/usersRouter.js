const router = require("express").Router();
const User = require("../schemas/UserSchema.js");
const Post = require("../schemas/PostSchema.js");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).exec();

    if (!users.length) {
      res.status(404).json({ message: "Sorry, no users!" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single user
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // returns user and all posts related to that user
    const user = await User.findById(userId).exec();
    const posts = await Post.find({ user: userId }).exec();

    if (!user) {
      res.status(404).json({ message: "Sorry, cant find that user!" });
    } else {
      res.status(200).json({
        user,
        posts
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// post a user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res
        .status(404)
        .json({ message: "Invalid user. Please provide all required fields." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
    // deletes all posts related to the user
    const deletePosts = await Post.deleteMany({ user: deletedUser._id }).exec();
    res
      .status(203)
      .json({ message: `successfulyl deleted user: ${deletedUser._id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a user by id
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
