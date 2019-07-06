const router = require("express").Router();
const User = require("../schemas/UserSchema.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../auth/restrictedMiddleware.js");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        token: token,
        user
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  try {
    const newUser = await User.create(user);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
