const router = require("express").Router();
const Post = require("../schemas/PostSchema.js");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).exec();

    if (!posts.length) {
      res.status(404).json({ message: "Sorry, no posts!" });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId)
      .populate("user")
      // probably dont actually want to do this, but just for reference for now!
      .exec();

    if (!post) {
      res.status(404).json({ message: "Sorry, cant find that post!" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    if (newPost) {
      res.status(201).json(newPost);
    } else {
      res
        .status(404)
        .json({ message: "Invalid post. Please provide all required fields." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
