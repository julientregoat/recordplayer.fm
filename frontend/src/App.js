import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
import LandingPage from './components/LandingPage/LandingPage'
import AccessPage from './components/AccessPage/AccessPage'
import HomePage from './components/Home/HomePage'
import PlaylistsPage from './components/Playlists/PlaylistsPage'
import './App.css';

class App extends Component {
  state = {
    currentUser: null
  }

  // use localstorage more securely when I get serious about deploying
  componentDidMount(){
    if (window.localStorage.currentUser && window.localStorage.currentUser !== 'undefined'){
      this.setState({currentUser: JSON.parse(window.localStorage.currentUser)})
    }
  }

  authenticateDiscogs = () => {
    window.open(`http://localhost:3001/discogs/authorize?user=${this.state.currentUser.id}`,"Discogs Authoritzation",
    "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1000,height=600")
    setTimeout(() => this.queryUserInfo(this.state.currentUser.id), 10000)
  }

  queryUserInfo = id => {
    fetch(`http://localhost:3001/api/users/${id}`)
    .then(res => res.json())
    .then(user => this.login(user))
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
        <HeaderContainer
          currentUser={this.state.currentUser}
          logout={this.logout}
          />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home"
            render={routerProps =>
              this.state.currentUser ?
              <HomePage
                {...routerProps}
                currentUser={this.state.currentUser}
                logout={this.logout}
                discogsAuth={this.authenticateDiscogs}
                queryUserInfo={this.queryUserInfo}
              /> :
              <Redirect to="/access" />
            }
          />
          <Route path="/access"
            render={routerProps =>
              !this.state.currentUser ?
              <AccessPage
                {...routerProps}
                login={this.login}
              /> :
              <Redirect to="/home" />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
