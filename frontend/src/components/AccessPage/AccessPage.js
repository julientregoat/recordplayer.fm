import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class AccessPage extends Component {

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
      <Grid.Row type="flex" justify="space-around" gutter={4}>
        <Grid.Column width={6}>
          <LoginForm loginCallback={this.handleLogin}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <SignupForm signupCallback={this.handleSignup}/>
        </Grid.Column>
      </Grid.Row>
    );
  }

}

export default AccessPage;
