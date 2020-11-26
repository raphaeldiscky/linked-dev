import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Meta from './Meta';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <Meta title={'LinkedDev'} />
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>LinkedDev</h1>
            <p className='lead'>
              Social media made by developers for developers
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
