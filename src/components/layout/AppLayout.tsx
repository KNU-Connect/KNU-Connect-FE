import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <Background>
      <Container>
        <Outlet />
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  min-height: 100dvh;
`;

const Container = styled.div`
  max-width: 600px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0;
`;
