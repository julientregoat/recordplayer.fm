import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

import Header from './components/Header/Header'
import AccessPage from './components/AccessPage/AccessPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid className="app">
        <Header />
        <Switch>
          <Route to="/access" component={AccessPage} />
        </Switch>
      </Grid>
    );
  }
}

export default App;
