import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { APP_WIDTH } from '@/constants/number';
import { chatQueryKeys } from '@/constants/queryKeys';
import type { ChatParticipant } from '@/types/chat';
import { useCreateNetworking } from './hooks/useCreateNetworking';
import {
  NetworkingCreateHeader,
  TitleInput,
  DescriptionInput,
  ParticipantCount,
  RepresentativeList,
} from './components';
import { getChatRoomParticipants } from './services/networking';

const NetworkingCreatePage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const createNetworkingMutation = useCreateNetworking();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [participantCount, setParticipantCount] = useState(1);
  const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<
    number | null
  >(null);

  const chatRoomId = useMemo(() => {
    if (!chatId || chatId === 'new') return undefined;
    const parsed = Number(chatId);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return undefined;
    }
    return parsed;
  }, [chatId]);

  const participantsQueryKey = chatRoomId
    ? chatQueryKeys.participants(chatRoomId)
    : ([...chatQueryKeys.all, 'participants', 'new'] as const);

  const {
    data: participants = [],
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
    refetch: refetchParticipants,
  } = useQuery<ChatParticipant[]>({
    queryKey: participantsQueryKey,
    queryFn: () => getChatRoomParticipants(chatRoomId as number),
    enabled: !!chatRoomId,
  });

  useEffect(() => {
    if (
      selectedRepresentativeId &&
      !participants.some(
        (participant) => participant.userId === selectedRepresentativeId,
      )
    ) {
      setSelectedRepresentativeId(null);
    }
  }, [participants, selectedRepresentativeId]);

  const minParticipantCount = Math.max(participants.length, 1);

  useEffect(() => {
    setParticipantCount((prev) => Math.max(prev, minParticipantCount));
  }, [minParticipantCount]);

  const handleComplete = async () => {
    if (!title || !selectedRepresentativeId) return;

    try {
      await createNetworkingMutation.mutateAsync({
        requestBody: {
          title,
          contents:
            contents ||
            '멘토링에 대한 일정을 공유해 같이 네트워킹할 멘티를 찾아보세요.',
          maxNumber: participantCount,
          representativeId: selectedRepresentativeId,
        },
        chatRoomId,
      });
      navigate(-1);
    } catch (error) {
      console.error('Failed to create networking post:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  const handleIncreaseCount = () => {
    setParticipantCount((prev) => prev + 1);
  };

  const handleDecreaseCount = () => {
    if (participantCount > minParticipantCount) {
      setParticipantCount((prev) => prev - 1);
    }
  };

  return (
    <Container>
      <NetworkingCreateHeader
        onComplete={handleComplete}
        isCompleteDisabled={
          !title ||
          !selectedRepresentativeId ||
          createNetworkingMutation.isPending
        }
      />
      <Content>
        <TitleInput value={title} onChange={setTitle} />
        <DescriptionInput value={contents} onChange={setContents} />
        <ParticipantCount
          count={participantCount}
          onIncrease={handleIncreaseCount}
          onDecrease={handleDecreaseCount}
          min={minParticipantCount}
        />
        <RepresentativeList
          participants={participants}
          isLoading={isParticipantsLoading}
          isError={isParticipantsError}
          isChatRoomAvailable={!!chatRoomId}
          onRetry={refetchParticipants}
          selectedId={selectedRepresentativeId}
          onSelect={setSelectedRepresentativeId}
        />
      </Content>
    </Container>
  );
};

export default NetworkingCreatePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  max-width: ${APP_WIDTH}px;
  margin: 0 auto;
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;
