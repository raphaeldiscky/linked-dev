import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layoutComponents/Spinner';
import Meta from '../layoutComponents/Meta';
import { CLEAR_POST } from '../../actions/types';

const Post = ({ getPost, post: { post, loading }, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const clearPost = () => {
    dispatch({ type: CLEAR_POST });
  };

  return loading || !post ? (
    <Spinner />
  ) : (
    <Fragment>
      <Meta title={post.name + ' Discussion'} />
      <Link to='/posts' className='btn' onClick={clearPost}>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
