import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action; // payload is object
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state, // state is immutable
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null, //remove token from local storage
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
