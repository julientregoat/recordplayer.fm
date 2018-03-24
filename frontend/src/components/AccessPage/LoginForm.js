import React from 'react';

import { Form } from 'semantic-ui-react'

const LoginForm = ({loginCallback, changeForm}) => (
  <React.Fragment>
    <h2>log in</h2>
    <Form onSubmit={loginCallback} className="formContainer">
      <Form.Input label="username" name="username" type="text"/>
      <Form.Input label="password" name="password" type="password"/>
      <Form.Button type="submit" color="black" basic>
        enter
      </Form.Button>
    </Form>
  </React.Fragment>
);

export default LoginForm;
