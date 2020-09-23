import React, { Fragment } from 'react';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
};

export default App;
