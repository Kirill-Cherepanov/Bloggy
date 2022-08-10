type TUser = {
  username: string;
  email: string;
  password: string;
  profilePic: string;
};

// THIS IS STUPID
// I HAVE SPENT 3 HOURS TRYING TO SOLVE THE ISSUE WITH MONGOOSE TYPES
// AND MANUALLY CREATING TYPES FOR MONGOOSE WAS THE BEST I COULD COMEUP WITH
// WHY EVEN MAKE IT SO COMPLICATED?!
interface User extends import('mongoose').Document, TUser {
  _id: import('mongoose').ObjectId;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}

type TPost = {
  title: string;
  desc: string;
  photo: string;
  username: string;
  categories: string[];
};

interface Post extends import('mongoose').Document, TPost {
  _id: import('mongoose').ObjectId;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  _doc: Omit<this, '_doc'>;
}
