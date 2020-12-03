import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlertDanger } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Meta from '../layoutComponents/Meta';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Register = ({ setAlertDanger, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  // Destructure formData
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if password match
    if (password !== password2) {
      setAlertDanger('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect to dashboard if isAuthenticated is true
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Meta title={'Sign Up | LinkedDev'} />
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary btn-float-right'
          value='Register'
        />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </motion.div>
  );
};

Register.propTypes = {
  setAlertDanger: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
  // we get all initialState from auth reducer, but only isAuthenticated
});

export default connect(mapStateToProps, { setAlertDanger, register })(Register);
// allow us to access props.setAlert, props.register, and props.isAuthenticated
