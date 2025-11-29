import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { HEADER_HEIGHT, NAV_HEIGHT } from '@/constants';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${HEADER_HEIGHT}px - ${NAV_HEIGHT}px);
  width: 100%;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.gray[30]};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const PageSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};
