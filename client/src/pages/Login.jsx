import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Container>
      <h2 className="mt-4">Login</h2>
      <LoginForm />
    </Container>
  );
};

export default Login;
