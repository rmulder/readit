import { IUser } from '../../interfaces/global.interfaces';
import authActionTypes from '../actionTypes/auth.actionTypes';

export interface IAuthState {
  authenticated: boolean;
  user?: IUser;
}

const initialState = {
  authenticated: false,
  user: undefined,
};

const authReducer = (state: IAuthState = initialState, action: authActionTypes): IAuthState => {
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
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
