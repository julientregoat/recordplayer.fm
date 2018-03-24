import React from 'react';

import { Form } from 'semantic-ui-react'

const SignupForm = ({signupCallback, changeForm}) => (
  <React.Fragment>
    <h2>sign up</h2>
    <Form onSubmit={signupCallback} className="form-container">
      <Form.Input label="username" name="username" type="text"/>
      <Form.Input label="email" name="email" type="text"/>
      <Form.Input label="password" name="password" type="password"/>
      <Form.Button type="submit" color="black" basic>
        Sign Up
      </Form.Button>
    </Form>
  </React.Fragment>

);

export default SignupForm;
