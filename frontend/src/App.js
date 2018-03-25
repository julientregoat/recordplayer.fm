import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
import AccessPage from './components/AccessPage/AccessPage'
import HomePage from './components/Home/HomePage'
import './App.css';

class App extends Component {
  state = {
    currentUser: null
  }

  // use localstorage more securely when I get serious about deploying
  componentDidMount(){
    if (window.localStorage.currentUser){
      this.setState({currentUser: JSON.parse(window.localStorage.currentUser)})
    }
  }

  login = user => {
    this.setState({currentUser: user})
    window.localStorage.setItem('currentUser', JSON.stringify(user))
  }

  logout = () => {
    this.setState({currentUser: null})
    window.localStorage.removeItem('currentUser')
  }

  render() {
    return (
      <div className="app">
        <HeaderContainer logout={this.logout}/>
        <Switch>
          {this.state.currentUser ? <Route path="/home" render={routerProps => <HomePage
            {...routerProps}
            currentUser={this.state.currentUser}
            logout={this.logout}
            />}/> : null}
          <Route path="/access" render={routerProps => <AccessPage {...routerProps} login={this.login} currentUser={this.state.currentUser}/>}/>
          <Redirect to="/access" />
        </Switch>
      </div>
    );
  }
}

export default App;
