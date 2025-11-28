import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_WIDTH } from '@/constants/number';
import { useCreateNetworking } from '@/api';
import {
  NetworkingCreateHeader,
  TitleInput,
  DescriptionInput,
  ParticipantCount,
  RepresentativeList,
} from './components';

const NetworkingCreatePage = () => {
  const navigate = useNavigate();
  const createNetworkingMutation = useCreateNetworking();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [participantCount, setParticipantCount] = useState(1);
  const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<
    number | null
  >(null);

  const handleComplete = async () => {
    if (!title || !selectedRepresentativeId) return;

    try {
      await createNetworkingMutation.mutateAsync({
        title,
        contents:
          contents ||
          '멘토링에 대한 일정을 공유해 같이 네트워킹할 멘티를 찾아보세요.',
        maxNumber: participantCount,
        representativeId: selectedRepresentativeId,
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
    if (participantCount > 1) {
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
        />
        <RepresentativeList
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
