type ReducerAction = {
  type: string;
  payload: string;
};

type ReducerState = {
  user: string | null;
  isFetching: boolean;
  error: boolean;
};

type ContextValue = ReducerState & { dispatch?: Dispatch<ReducerAction> };
