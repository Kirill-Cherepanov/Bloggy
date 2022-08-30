import User from '../models/User';
import bcrypt from 'bcrypt';
import express from 'express';
const authRouter = express.Router();

const fakeUserJSON = `{"username":"test","email":"test@test.com","password":"12345","blog":{"likes":0,"categories":["science","programming","math"],"description":"A small description", "createdAt": "1970-01-01T00:00:00.000Z"}}`;

authRouter.post('/registration', async (req, res) => {
  try {
    const validationResult = await validateRegistration(req.body);
    if (!validationResult.res) {
      return res.status(500).json({ errors: validationResult.errors });
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
    return res.status(500).json(err);
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

async function validateRegistration(data: Partial<TUser>) {
  const errors = await validateUniqueness({
    username: data.username,
    email: data.email,
  });

  if (data.password) {
    const passwordError = validatePassword(data.password);
    if (passwordError) errors.push(['password', passwordError]);
  }

  if (errors.length === 0) return { res: true, errors: null };
  return { res: false, errors: Object.fromEntries(errors) };
}

function validatePassword(password: string) {
  if (password.length < 5) {
    return getMongoDbValidationErrorObj({
      path: 'password',
      value: password,
      name: 'ValidatorError',
      message: `Password must be at least 5 characters long`,
    });
  } else if (password.length > 20) {
    return getMongoDbValidationErrorObj({
      path: 'password',
      value: password,
      name: 'ValidatorError',
      message: `Password must be at most 20 characters long`,
    });
  }
  return null;
}

async function validateUniqueness(data: Partial<TUser>) {
  const errors = await Promise.all(
    Object.entries(data).map(async (datum) => {
      const user = await User.findOne({ [datum[0]]: datum[1] });

      if (!user) return null;

      return [
        datum[0],
        getMongoDbValidationErrorObj({
          path: datum[0],
          value: datum[1],
        }),
      ];
    })
  );
  const filteredErrors = errors.filter(truthyFilter);

  return filteredErrors;
}

type GetMongoDbValidationErrorObj = {
  path: string;
  value: unknown;
  name?: string;
  message?: string;
};

const getMongoDbValidationErrorObj = ({
  path,
  value,
  message = 'UniquenessError',
  name = `This ${path} is already taken`,
}: GetMongoDbValidationErrorObj) => ({
  name,
  message,
  properties: {
    message,
    type: 'user defined',
    path,
    value,
  },
  kind: 'user defined',
  path,
  value,
});

const truthyFilter = <T>(x: T | false | undefined | null | '' | 0): x is T =>
  !!x;
