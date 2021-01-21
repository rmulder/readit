import { IUser } from '../../interfaces/global.interfaces';
import authActionTypes from '../actionTypes/auth.actionTypes';

const login = (user: IUser): authActionTypes => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

const logout = (): authActionTypes => {
  return {
    type: 'LOGOUT',
    payload: undefined,
  };
};

export { login, logout };
