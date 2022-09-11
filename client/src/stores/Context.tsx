import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Dispatcher';

type Props = {
  children: React.ReactNode;
};

const INITIAL_STATE: ContextValue = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
