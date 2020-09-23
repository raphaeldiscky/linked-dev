// we're gonna have multiple reducer so using combineReducers
import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
  alert
});
