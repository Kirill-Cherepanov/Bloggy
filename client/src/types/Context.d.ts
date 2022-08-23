type ReducerAction = {
  type: string;
  payload: User;
};

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
};

interface Blog extends User {
  likes: number;
  categories: string[];
  description: string;
}

type Post = {
  _id: string;
  title: string;
  text: string;
  image: string;
  categories: string[]; // It is stored as a separate mongoDb model, with _id and name. Doesn't make much sense to me. Maybe will need to rethink this later
  authorName: string;
  displayType: number;
  createdAt: Date; // It's actually stored as a string in mongodb, so I would need to rethink how I manage this. Maybe convert to Date upon receiving the data
};

type ReducerState = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
};

type ContextValue = ReducerState & { dispatch?: Dispatch<ReducerAction> };
