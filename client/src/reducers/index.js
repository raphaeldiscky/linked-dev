// we're gonna have multiple reducer so using combineReducers
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  alert,
  auth
});
