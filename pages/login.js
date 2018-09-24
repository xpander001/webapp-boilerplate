import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: gray;
`;

const Login = () => (
  <div>
    <Container>
      <a href="/login/google">LOGIN</a>
    </Container>
  </div>
);

export default Login;
