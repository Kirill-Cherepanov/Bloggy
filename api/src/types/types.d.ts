type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
};

type Post = {
  title: string;
  desc: string;
  photo: string;
  username: import('mongoose').ObjectId;
  categories: string[];
};
