const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    const checkUser = await User.findOne({ username: req.body.username });

    if (checkUser) {
      return res.status(400).json("This username already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("Username not exist!");
    }
    const validate = await bcrypt.compare(req.body.password, user.password);

    // !validate && res.status(400).json("Wrong Password!");

    if(!validate){
      return res.status(400).json("Wrong Password!");
    }
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
