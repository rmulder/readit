import { Dispatch, createContext, useContext, useReducer } from 'react';

import { IUser } from '../interfaces/global.interfaces';

interface IAuthState {
  authenticated: boolean;
  user?: IUser;
}

interface IAction {
  type: string;
  payload?: any;
}

export const AuthContext = createContext<IAuthState>({ authenticated: false, user: undefined });
export const AuthDispatchContext = createContext<Dispatch<IAction>>(null!);

const authReducer = (state: IAuthState, action: IAction) => {
  const { type, payload } = action;

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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    user: undefined,
  });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthProvider;
