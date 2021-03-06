import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), // get token from local storage
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  // destructure action
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
        // payload is user object with name, email, and avatar
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token); // add token in local storage
      return {
        ...state, // return everything in state with spread operator (...)
        ...payload, // return everyting in payload
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null, // remove token from local storage
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
