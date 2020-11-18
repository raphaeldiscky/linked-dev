import React, { Fragment } from 'react';

export const NotFound = () => {
  return (
    <Fragment>
      <h1 className='large text-primary text-center my-2'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found!
      </h1>
      <p className='medium text-center'>Sorry, this page does not exist :(</p>
    </Fragment>
  );
};

export default NotFound;
