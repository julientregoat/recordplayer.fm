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

    let username = event.target.username.value
    let password = event.target.password.value

    fetch('http://localhost:3001/api/users/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleSignup = event => {
    event.preventDefault()

    let username = event.target.username.value
    let email = event.target.email.value
    let password = event.target.password.value

    fetch('http://localhost:3001/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(console.log)
  }

  formChanger(){
    if (this.state.loginView){
      return <h4 onClick={this.changeForm} className="change-form">...or register an account</h4>
    } else {
      return <h4 onClick={this.changeForm} className="change-form">...or log in to an existing account</h4>
    }
  }

  changeForm = event => {
    this.setState({loginView: !this.state.loginView})
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Row centered>
          <Grid.Column width={6}>
            {this.state.loginView ?
              <LoginForm loginCallback={this.handleLogin}/> :
              <SignupForm signupCallback={this.handleSignup}/> }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          {this.formChanger()}
        </Grid.Row>
      </React.Fragment>
    );
  }

}

export default AccessPage;
