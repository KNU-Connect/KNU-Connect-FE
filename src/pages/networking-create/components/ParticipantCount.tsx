import styled from '@emotion/styled';
import { ChevronUp, ChevronDown, User } from 'lucide-react';

type ParticipantCountProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const ParticipantCount = ({
  count,
  onIncrease,
  onDecrease,
}: ParticipantCountProps) => {
  return (
    <Container>
      <Icon>
        <User size={20} />
      </Icon>
      <Label>참여 가능 인원 수 설정 : {count}</Label>
      <Controls>
        <Button onClick={onIncrease}>
          <ChevronUp size={20} />
        </Button>
        <Button onClick={onDecrease} disabled={count <= 1}>
          <ChevronDown size={20} />
        </Button>
      </Controls>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border-radius: ${({ theme }) => theme.spacing[3]};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.sub};
`;

const Label = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray[60] : theme.colors.text.default};
  transition: opacity 0.2s;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.7)};
  }

  &:active {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
  }
`;

