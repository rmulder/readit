import { IUser } from '../../interfaces/global.interfaces';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
  payload: IUser;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: undefined;
}

type authActionTypes = LoginAction | LogoutAction;

export default authActionTypes;
