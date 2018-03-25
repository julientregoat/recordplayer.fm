import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
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
        <HeaderContainer logout={this.logout}/>
        <Switch>
          {this.state.currentUser ?
            <Route path="/home"
              render={routerProps =>
                <HomePage
                  {...routerProps}
                  currentUser={this.state.currentUser}
                  logout={this.logout}
                  discogsAuth={this.authenticateDiscogs}
                  queryUserInfo={this.queryUserInfo}
                />}
            />: null}
          <Route path="/access" render={routerProps => <AccessPage {...routerProps} login={this.login} currentUser={this.state.currentUser}/>}/>
          <Redirect to="/access" />
        </Switch>
      </div>
    );
  }
}

export default App;
