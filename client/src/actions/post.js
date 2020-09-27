import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_UPVOTES } from './types';

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add upvote
export const addUpvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/upvote/${id}`); // id => postId
    dispatch({
      type: UPDATE_UPVOTES,
      payload: { id, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove upvote
export const removeUpvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unvote/${id}`); // id => postId
    dispatch({
      type: UPDATE_UPVOTES,
      payload: { id, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
