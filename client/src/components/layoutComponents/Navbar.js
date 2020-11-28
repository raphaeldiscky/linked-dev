import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from './logo.png';
import logo1 from './logo1.png';
import { CLEAR_PROFILE, CLEAR_POST } from '../../actions/types';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const dispatch = useDispatch();

  const clearProfile = () => {
    dispatch({ type: CLEAR_PROFILE });
  };

  const clearPost = () => {
    dispatch({ type: CLEAR_POST });
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles' onClick={clearProfile}>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/posts' onClick={clearPost}>
          Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>{' '}
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles' onClick={clearProfile}>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <img
              src={logo}
              onMouseOver={(e) => (e.currentTarget.src = logo1)}
              onMouseOut={(e) => (e.currentTarget.src = logo)}
              alt='LinkedDev Logo'
              style={{ width: '40px', position: 'absolute' }}
            ></img>
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth // have access tp props.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
