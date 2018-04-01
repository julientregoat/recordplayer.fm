import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import HeaderContainer from './components/Header/HeaderContainer'
import LandingPage from './components/Landing/LandingPage'
import AccessPage from './components/Access/AccessPage'
import CollectionPage from './components/Collection/CollectionPage'
import AccountPage from './components/Account/AccountPage'
import PlaylistsPage from './components/Playlists/PlaylistsPage'
import './App.css';

class App extends Component {

  state = {
    currentUser: null
  }

  // use currentUser/localstorage more securely when I get serious about deploying
  componentDidMount(){
    if (window.localStorage.currentUser && window.localStorage.currentUser !== 'undefined'){
      this.setState({currentUser: JSON.parse(window.localStorage.currentUser)})
    }
  }

  authenticateDiscogs = () => {
    // maybe I can query the DB to get back the link instead of exposing the back end url
    window.open(`http://localhost:3001/discogs/authorize?user=${this.state.currentUser.id}`,"Discogs Authoritzation",
    "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1000,height=600")
    setTimeout(() => this.queryUserInfo(this.state.currentUser.id), 10000)
  }

  queryUserInfo = id => {
    // this should become an authenticated request with JWT
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

  // create an authentication HOC so the conditonal rendering is DRY
  // will also need a discogs auth HOC for once the user is logged in
  render() {
    return (
      <div className="app">
        <HeaderContainer
          currentUser={this.state.currentUser}
          logout={this.logout}
          />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/collection"
            render={routerProps =>
              this.state.currentUser ?
              <CollectionPage
                {...routerProps}
                currentUser={this.state.currentUser}
                logout={this.logout}
                authenticateDiscogs={this.authenticateDiscogs}
              /> :
              <Redirect to="/access?from=collection" />
            }
          />
          <Route path="/playlists"
            render={routerProps =>
              this.state.currentUser ?
              <PlaylistsPage
                {...routerProps}
                currentUser={this.state.currentUser}
                logout={this.logout}
              /> :
              <Redirect to="/access?from=playlists" />
            }
          />
        <Route path="/account"
            render={routerProps =>
              this.state.currentUser ?
              <AccountPage
                {...routerProps}
                currentUser={this.state.currentUser}
                logout={this.logout}
              /> :
              <Redirect to="/access?from=account" />
            }
          />
          <Route path="/access"
            render={routerProps => {
              let referrer = routerProps.location.search.split('?from=')[1] || "collection"
              return (!this.state.currentUser ?
              <AccessPage
                {...routerProps}
                login={this.login}
              /> :
              <Redirect to={"/" + referrer} />)
            }}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
