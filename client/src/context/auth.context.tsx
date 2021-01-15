import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react';

import { IUser } from '../interfaces/global.interfaces';
import { readitAxios } from '../configs/axios.config';

interface IState {
  authenticated: boolean;
  user?: IUser;
}

interface IAction {
  type: string;
  payload?: any;
}

const StateContext = createContext<IState>({ authenticated: false, user: undefined });
const DispatchContext = createContext<Dispatch<IAction>>(null!);

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

const reducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: undefined,
      };

    default:
      throw new Error('Unknown action type');
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    authenticated: false,
    user: undefined,
  });

  useEffect(() => {
    readitAxios
      .get('/auth/profile')
      .then((response) => dispatch({ type: 'LOGIN', payload: response.data.results }))
      .catch((err) => {});
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
