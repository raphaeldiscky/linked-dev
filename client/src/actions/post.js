import axios from 'axios';
import { setAlertSuccess } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_UPVOTES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types';

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

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`); // id => postId
    dispatch({
      type: DELETE_POST,
      payload: id // payload only send id, so that reducer know how to filter out the posts that got deleted from UI
    });
    dispatch(setAlertSuccess('Post Deleted'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts/', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlertSuccess('Post Created'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlertSuccess('Comment Added'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId // payload is commentId so we know which one to remove in the state within the UI
    });
    dispatch(setAlertSuccess('Comment Deleted'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
