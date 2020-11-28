import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layoutComponents/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import Meta from '../layoutComponents/Meta';
import { motion } from 'framer-motion';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  // useEffect => as soon as this profiles load we need to call that GET_PROFILES action
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <Meta title={'Developers'} />
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fas fa-hands-helping' />
        {'  '}Browse and connect with developers
      </p>
      <div className='profiles'>
        {profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </div>
    </motion.div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
