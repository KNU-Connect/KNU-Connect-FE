import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import type { NetworkingParticipant } from '../services/getNetworkingParticipantsList';
import { ModifyRepresentativeCard } from './ModifyRepresentativeCard';

type ModifyRepresentativeListProps = {
  participants: NetworkingParticipant[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void | Promise<unknown>;
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const ModifyRepresentativeList = ({
  participants,
  isLoading,
  isError,
  onRetry,
  selectedId,
  onSelect,
}: ModifyRepresentativeListProps) => {
  let content: ReactNode = null;
  console.log(participants);

  if (isLoading) {
    content = <Message>참여자를 불러오는 중입니다.</Message>;
  } else if (isError) {
    content = (
      <Message>
        참여자 목록을 불러오지 못했습니다.
        {onRetry && <RetryButton onClick={onRetry}>다시 시도</RetryButton>}
      </Message>
    );
  } else if (participants.length > 0) {
    content = (
      <List>
        {participants.map((participant) => (
          <ModifyRepresentativeCard
            key={participant.id}
            participant={participant}
            isSelected={selectedId === participant.id}
            onSelect={() => onSelect(participant.id)}
          />
        ))}
      </List>
    );
  } else {
    content = <Message>아직 채팅방 참여자가 없습니다.</Message>;
  }

  return (
    <Container>
      <Title>대표자 설정하기</Title>
      {content}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const RetryButton = styled.button`
  margin-left: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body3.lineHeight};
  cursor: pointer;
`;
