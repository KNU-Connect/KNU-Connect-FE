import styled from '@emotion/styled';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type NetworkingCreateHeaderProps = {
  onComplete: () => void;
  isCompleteDisabled: boolean;
};

export const NetworkingCreateHeader = ({
  onComplete,
  isCompleteDisabled,
}: NetworkingCreateHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={24} />
      </BackButton>
      <Title>네트워킹 글 생성</Title>
      <CompleteButton onClick={onComplete} disabled={isCompleteDisabled}>
        완료
      </CompleteButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.default};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.subtitle1.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const CompleteButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray[60] : theme.colors.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.7)};
  }

  &:active {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
  }
`;
