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

type Post = {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  categories: string[];
  createdAt: string;
};

type ReducerState = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
};

type ContextValue = ReducerState & { dispatch?: Dispatch<ReducerAction> };
