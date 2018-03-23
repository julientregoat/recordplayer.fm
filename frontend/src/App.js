import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import AccessPage from './components/AccessPage/AccessPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route to="/access" component={AccessPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
