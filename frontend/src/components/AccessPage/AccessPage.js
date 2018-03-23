import React, { Component } from 'react';
import { Row, Col } from 'antd'

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
      <Row type="flex" justify="space-around" gutter={4}>
        <Col span={6}>
          <LoginForm loginCallback={this.handleLogin}/>
        </Col>
        <Col span={6}>
          <SignupForm signupCallback={this.handleSignup}/>
        </Col>
      </Row>
    );
  }

}

export default AccessPage;
