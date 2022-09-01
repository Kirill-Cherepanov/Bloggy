type TBlog = {
  likes?: number;
  categories?: string[];
  description?: string;
  // createdAt: Date;
};

interface Blog extends import('mongoose').Document, TBlog {
  _id: import('mongoose').ObjectId;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}

type TUser = {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  blog?: TBlog;
};

interface User extends import('mongoose').Document, TUser {
  _id: import('mongoose').ObjectId;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}

type TPost = {
  title: string;
  text: string;
  image: string;
  authorName: string;
  likes: number;
  categories: string[];
  displayType: number;
};

interface Post extends import('mongoose').Document, TPost {
  _id: import('mongoose').ObjectId;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
