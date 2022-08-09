// import UserSchema from '../modules/User';
import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      // Need to check what happens if the wrong data is sent. i.e. if username is blank
      username: req.body.username as String,
      email: req.body.email as String,
      password: hashedPass as String
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, ...loginInfo } = user;
    res.status(200).json(loginInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
