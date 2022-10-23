import { PublicData, ProtectedData, PrivateData, PostData } from 'types';
import { random } from 'utility';

type Overrides = Record<string, any>;

export const generatePublicData = (overrides?: Overrides): PublicData => ({
  username: random.string(random.int(20, 5)),
  profilePic: 'default.jpg',
  blog: {
    likes: random.int(1000),
    categories: random.array(10, () => random.string(20)),
    description: random.text(random.int(300)),
    createdAt: random.date(0).toISOString(),
  },
  createdAt: random.date(0).toISOString(),
  ...overrides,
});

export const generateProtectedData = (
  overrides?: Overrides
): ProtectedData => ({
  ...generatePublicData(),
  email: random.email(),
  ...overrides,
});

export const generatePrivateData = (overrides?: Overrides): PrivateData => ({
  ...generateProtectedData(),
  password: random.string(random.int(20, 5)),
  ...overrides,
});

export const generatePost = (overrides?: Overrides): PostData => ({
  _id: random.string(20),
  title: random.text(random.int(100, 1)),
  text: random.text(random.int(10000)),
  description: random.text(random.int(300)),
  authorName: random.string(random.int(20, 5)),
  likes: random.int(1000),
  isLiked: random.boolean(),
  categories: random.array(10, () => random.string(20)),
  displayType: random.int(2),
  createdAt: random.date(0).toISOString(),
  image: '',
  ...overrides,
});

export const generatePosts = (
  overrides?: Overrides,
  amount: number = random.int(10, 1)
): PostData[] =>
  Array(amount)
    .fill(0)
    .map((_, index) => generatePost({ ...overrides, _id: `${index}` }));
