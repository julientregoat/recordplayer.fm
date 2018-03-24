import React from 'react';

import { Form } from 'semantic-ui-react'

const SignupForm = ({signupCallback}) => (
  <Form>
    <Form.Input label="username" type="text"/>
    <Form.Input label="email" type="text"/>
    <Form.Input label="password" type="password"/>
    <Form.Input label="confirm password" type="password"/>
  </Form>

);

export default SignupForm;
