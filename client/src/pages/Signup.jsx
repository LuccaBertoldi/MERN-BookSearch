

import React from 'react';
import { Container } from 'react-bootstrap';
import SignupForm from '../components/SignupForm'; // Adjust path if needed

const Signup = () => {
  return (
    <Container>
      <h2 className="mt-4">Sign Up</h2>
      <SignupForm />
    </Container>
  );
};

export default Signup;
