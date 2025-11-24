import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { TheHeader, type HeaderType } from './TheHeader';
import { APP_WIDTH } from '@/constants';
import { TheNav, type NavType } from './TheNav';

type AppLayoutProps = {
  headerType?: HeaderType;
  navType?: NavType;
};

export const AppLayout = ({
  headerType = 'default',
  navType = 'default',
}: AppLayoutProps) => {
  return (
    <Background>
      <Container>
        {headerType === 'default' && <TheHeader />}
        <Main>
          <Outlet />
        </Main>
        {navType === 'default' && <TheNav />}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  min-height: 100dvh;
  background: #c8d5d8;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${APP_WIDTH}px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
`;
