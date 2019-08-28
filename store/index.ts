import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';

import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const initStore = initialState => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(promise)));
};

export default initStore;

