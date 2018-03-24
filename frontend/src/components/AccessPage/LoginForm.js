import React from 'react';

import { Form } from 'semantic-ui-react'

const LoginForm = ({loginCallback}) => (
  <React.Fragment>
    <h2>log in</h2>
    <Form label="login" onSubmit={loginCallback}>
      <Form.Input label="username" type="text"/>
      <Form.Input label="password" type="password"/>
      <Form.Button type="submit" color="black" basic>
        enter
      </Form.Button>
    </Form>
    <p>...or register an account</p>
  </React.Fragment>
);

export default LoginForm;
