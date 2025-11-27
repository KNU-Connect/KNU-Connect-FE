import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const dotsBlink = keyframes`
  0%, 20% {
    opacity: 0.2;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-4px);
  }
  80%, 100% {
    opacity: 0.2;
    transform: translateY(0);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: ${dotsBlink} 1.2s infinite ease-in-out both;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

interface LoadingDotsOverlayProps {
  visible: boolean;
}

export const LoadingDotsOverlay = ({ visible }: LoadingDotsOverlayProps) => {
  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <Dots>
        <Dot />
        <Dot />
        <Dot />
      </Dots>
    </Overlay>
  );
};
