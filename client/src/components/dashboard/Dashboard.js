import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/profile';
import Spinner from '../layoutComponents/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Meta from '../layoutComponents/Meta';
import AlertDialog from '../layoutComponents/AlertDialog';
import { motion } from 'framer-motion';

// use useEffect to get current profile as soon as this page load
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const deleteAccountHandler = (e) => {
    deleteAccount();
  };

  return loading && !profile ? (
    <Spinner />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 5 }}
      transition={{ delay: 1, duration: 1, delayduration: 2 }}
    >
      <Meta title={'Dashboard'} />
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {loading ? (
        <Spinner />
      ) : profile ? (
        <div>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <AlertDialog
              whatToDelete='Account'
              contextText='All your data and account will be permanently deleted and
                  cannot be recovered. Are you sure you want to delete your
                  account?'
              handleDelete={deleteAccountHandler}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 3.5, delayduration: 2 }}
        >
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
