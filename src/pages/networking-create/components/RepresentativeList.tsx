import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import type { ChatParticipant } from '@/types/chat';
import { RepresentativeCard } from './RepresentativeCard';

type RepresentativeListProps = {
  participants: ChatParticipant[];
  isLoading: boolean;
  isError: boolean;
  isChatRoomAvailable: boolean;
  onRetry?: () => void | Promise<unknown>;
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const RepresentativeList = ({
  participants,
  isLoading,
  isError,
  isChatRoomAvailable,
  onRetry,
  selectedId,
  onSelect,
}: RepresentativeListProps) => {
  let content: ReactNode = null;

  if (!isChatRoomAvailable) {
    content = (
      <Message>
        채팅방에서 진입하면 참여자들을 대표자로 선택할 수 있어요.
      </Message>
    );
  } else if (isLoading) {
    content = <Message>참여자를 불러오는 중입니다.</Message>;
  } else if (isError) {
    content = (
      <Message>
        참여자 목록을 불러오지 못했습니다.
        {onRetry && <RetryButton onClick={onRetry}>다시 시도</RetryButton>}
      </Message>
    );
  } else if (!participants.length) {
    content = <Message>아직 채팅방 참여자가 없습니다.</Message>;
  } else {
    content = (
      <List>
        {participants.map((participant) => (
          <RepresentativeCard
            key={participant.userId}
            participant={participant}
            isSelected={selectedId === participant.userId}
            onSelect={() => onSelect(participant.userId)}
          />
        ))}
      </List>
    );
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
