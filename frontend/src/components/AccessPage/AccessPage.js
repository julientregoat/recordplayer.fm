import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class AccessPage extends Component {

  state = {
    loginView: true
  }

  handleLogin = event => {
    event.preventDefault()
    fetch('http://localhost:3001/api/users/session', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleSignup = event => {
    event.preventDefault()
    fetch('http://localhost:3001/api/users/', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(console.log)
  }

  render() {
    return (
      <Grid.Row centered>
        <Grid.Column width={6}>
          {this.state.loginView ? <LoginForm loginCallback={this.handleLogin}/> : <SignupForm signupCallback={this.handleSignup}/> }
        </Grid.Column>
      </Grid.Row>
    );
  }

}

export default AccessPage;
