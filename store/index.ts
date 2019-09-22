import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const initStore = initialState => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
};

export default initStore;

