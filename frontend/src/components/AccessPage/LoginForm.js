import React from 'react';

import { Form, Input, Button } from 'antd';

const LoginForm = ({loginCallback}) => (
  <Form onSubmit={loginCallback}>
    <Form.Item><Input addonBefore="Username:" name="username" /></Form.Item>
    <Form.Item><Input addonBefore="Password:" type="password" name="password" /></Form.Item>
    <Form.Item><Button htmlType="submit" type="primary" ghost>Login</Button></Form.Item>
  </Form>
);

export default LoginForm;
