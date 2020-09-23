import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        {/*Route Landing => put outside container, because we want the image to go all the way over*/}
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            {/*Use switch for private component*/}
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
