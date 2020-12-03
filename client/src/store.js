// Just a boilerplate
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// set initialState to empty object
const initialState = {};
const middleware = [thunk];

// create store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // so we can use redux devtools in chrome
);

export default store;
