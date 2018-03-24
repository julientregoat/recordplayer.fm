import React from 'react';

import { Form } from 'semantic-ui-react'

const LoginForm = ({loginCallback}) => (

  <Form>
    <Form.Input label="username" type="text"/>
    <Form.Input label="password" type="password"/>
  </Form>
);

export default LoginForm;
