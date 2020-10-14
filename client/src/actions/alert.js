import { SET_ALERT_SUCCESS, SET_ALERT_DANGER } from './types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const setAlertSuccess = (msg) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT_SUCCESS,
    payload: { msg, id }
  });
  toast.success(msg);
};

export const setAlertDanger = (msg) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT_DANGER,
    payload: { msg, id }
  });
  toast.error(msg);
};
