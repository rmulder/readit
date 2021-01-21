import rootReducer from './reducers/root.reducer';

import { applyMiddleware, createStore } from 'redux';
import { IAuthState } from './reducers/auth.reducer';

//combine all the reducer states into a single interface. Useful when the full app state is required by the useSelector hook etc
export interface IAppState {
  auth: IAuthState;
}

const middleware: any = [];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export { store };
