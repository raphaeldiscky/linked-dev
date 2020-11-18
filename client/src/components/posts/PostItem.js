import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addUpvote, removeUpvote, deletePost } from '../../actions/post';

const PostItem = ({
  addUpvote,
  removeUpvote,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, upvotes, comments, date },
  showActions
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addUpvote(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-up'></i>{' '}
              <span>{upvotes.length > 0 && <span>{upvotes.length}</span>}</span>
            </button>
            <button
              onClick={(e) => removeUpvote(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} class='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span class='comment-count'> {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                class='btn btn-danger'
              >
                <i class='fas fa-trash' /> Delete
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addUpvote: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addUpvote,
  removeUpvote,
  deletePost
})(PostItem);
