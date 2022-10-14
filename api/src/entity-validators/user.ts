import * as z from 'zod';

import User from 'models/User';

// a simple email validation
export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function validateUniqueness(email?: string, username?: string) {
  if (email) {
    const user = await User.findOne({ email });
    if (user) throw Error('User with such email already exists');
  }

  if (username) {
    const user = await User.findOne({ username });
    if (user) throw Error('This username is already taken');
  }

  return true;
}

const createBlogSchema = z.object({
  categories: z
    .string()
    .array()
    .max(10, 'Must be 10 categories at most')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters long')
    .optional(),
});

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  email: z.string(),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  profilePic: z.string().optional(),
  blog: createBlogSchema.optional(),
});

export const makeUser = async (
  data: unknown,
  shouldValidateUniqueness: boolean = true
) => {
  const user = createUserSchema.parse(data);

  if (!validateEmail(user.email)) throw Error('Incorrect email');
  if (shouldValidateUniqueness) {
    await validateUniqueness(user.email, user.username);
  }

  return user;
};

export const makePartialUser = (data: unknown) => {
  const user = createUserSchema.deepPartial().parse(data);

  if (user.email && !validateEmail(user.email)) throw Error('Incorrect email');

  return user;
};
