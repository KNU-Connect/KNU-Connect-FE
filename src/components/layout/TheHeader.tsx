import { APP_WIDTH, HEADER_HEIGHT } from '@/constants';
import { ROUTES } from '@/routes';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export type HeaderType = 'default' | 'none';

export const TheHeader = () => {
  return (
    <Container>
      <Link to={ROUTES.HOME}>
        <Title>KNU connect</Title>
      </Link>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  max-width: ${APP_WIDTH}px;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  line-height: ${({ theme }) => theme.typography.title1.lineHeight};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
