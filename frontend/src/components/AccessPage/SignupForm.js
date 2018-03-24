import React from 'react';

import { Form } from 'semantic-ui-react'

const SignupForm = ({signupCallback}) => (
  <React.Fragment>
    <h2>sign up</h2>
    <Form onSubmit={signupCallback}>
      <Form.Input label="username" type="text"/>
      <Form.Input label="email" type="text"/>
      <Form.Input label="password" type="password"/>
      <Form.Input label="confirm password" type="password"/>
      <Form.Button type="submit" color="black" basic>
        Sign Up
      </Form.Button>
    </Form>
  </React.Fragment>

);

export default SignupForm;
