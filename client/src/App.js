import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layoutComponents/Navbar';
import Landing from './components/layoutComponents/Landing';
import Routes from './components/routes/Routes';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

import { toast } from 'react-toastify';

toast.configure();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // dispatch loadUser
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
