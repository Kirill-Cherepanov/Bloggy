import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
const authRouter = express.Router();

authRouter.post('/registration', async (req, res) => {
  try {
    const validationResult = validateRegistration(req.body as TUser);
    if (!validationResult.res) {
      return res
        .status(400)
        .json('Invalid authentification data: ' + validationResult.message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...(req.body as TUser),
      ...{ password: hashedPassword },
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.status(400).json('Wrong credentials!');

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json('Wrong credentials!');

    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default authRouter;

function validateRegistration(data: TUser): { res: boolean; message: string } {
  // const registrationData: TUser = {
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email,
  //   blog: req.body.blog,
  //   profilePic: req.body.profilePic,
  // };
  return { res: false, message: 'Not implemented' };
}
