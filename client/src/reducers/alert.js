import { SET_ALERT_SUCCESS, SET_ALERT_DANGER } from '../actions/types';

const initialState = [
  //   {
  //     id: 1,
  //     msg: 'Please log in',
  //     alertType: 'success'
  //   },
];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT_SUCCESS:
      return [...state, payload];
    case SET_ALERT_DANGER:
      return [...state, payload];
    default:
      return state;
  }
}
