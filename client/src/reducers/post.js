import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_UPVOTES,
  DELETE_POST,
  ADD_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload, // fill posts with payload from the action file
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], // put payload first because we want the latest post to be on top
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload), // we returning all posts, except the postId that matches with payload, the payload is just the id
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_UPVOTES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, upvotes: payload.upvotes } : post
        ),
        loading: false
      };
    default:
      return state;
  }
}
