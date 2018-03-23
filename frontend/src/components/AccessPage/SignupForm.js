import React from 'react';

import { Form, Input, Button } from 'antd'


// use antd form?

const SignupForm = ({signupCallback}) => (
  <Form onSubmit={signupCallback}>
    <Form.Item><Input addonBefore="Username:" name="username" /></Form.Item>
    <Form.Item><Input addonBefore="Email:" name="email" /></Form.Item>
    <Form.Item><Input addonBefore="Password:" type="password" name="password" /></Form.Item>
    <Form.Item><Input addonBefore="Confirm Password:" type="password" name="password" /></Form.Item>
    <Form.Item><Button htmlType="submit" type="primary" ghost>Sign Up</Button></Form.Item>
  </Form>
);

export default SignupForm;
