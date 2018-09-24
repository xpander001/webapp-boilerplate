import React from 'react';
import styled from 'styled-components';

import withAuth from '../lib/WithAuth';

const Container = styled.div`
  display: flex;
  color: gray;
`;

const PrivatePage = () => (
  <div>
    <Container>This is a private page</Container>
  </div>
);

export default withAuth(PrivatePage);
