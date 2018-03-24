import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

import HeaderContainer from './components/Header/HeaderContainer'
import AccessPage from './components/AccessPage/AccessPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid className="app">
        <HeaderContainer />
        <Switch>
          <Route to="/access" component={AccessPage} />
        </Switch>
      </Grid>
    );
  }
}

export default App;
