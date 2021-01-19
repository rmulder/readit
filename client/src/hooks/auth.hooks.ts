import { useContext } from 'react';
import { AuthDispatchContext } from './../context/auth.context';
import { AuthContext } from '../context/auth.context';

const useAuthState = () => useContext(AuthContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { useAuthState, useAuthDispatch };
