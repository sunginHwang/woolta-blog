import { createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const initStore = initialState => {
  return createStore(reducers, initialState, composeWithDevTools());
};

export default initStore;

