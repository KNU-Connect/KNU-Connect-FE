import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { APP_WIDTH } from '@/constants/number';
import { networkingQueryKeys } from '@/constants/queryKeys';
import {
  TitleInput,
  DescriptionInput,
  ParticipantCount,
} from '../networking-create/components';
import { useModifyNetworking } from './hooks/useModifyNetworking';
import { useNetworkingDetail } from '@/pages/networking/hooks/useNetworkingDetail';
import { NetworkingModifyHeader, ModifyRepresentativeList } from './components';
import {
  getNetworkingParticipantsList,
  type NetworkingParticipantsList,
} from './services/getNetworkingParticipantsList';

const NetworkingModifyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const networkingId = id ? Number(id) : 0;
  const modifyNetworkingMutation = useModifyNetworking();
  const { data: detailData, isLoading: isDetailLoading } =
    useNetworkingDetail(networkingId);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [participantCount, setParticipantCount] = useState(1);
  const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<
    number | null
  >(null);

  const {
    data: participants,
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
    refetch: refetchParticipants,
  } = useQuery<NetworkingParticipantsList>({
    queryKey: networkingQueryKeys.participants(networkingId),
    queryFn: () => getNetworkingParticipantsList(networkingId),
    enabled: !!networkingId,
  });

  useEffect(() => {
    if (detailData) {
      setTitle(detailData.title);
      setContents(detailData.contents);
      setParticipantCount(detailData.maxNumber);
      setSelectedRepresentativeId(detailData.representative?.id ?? null);
    }
  }, [detailData]);

  // 대표자 최소 인원수에 맞춰 참가자 수 설정
  // 현재 참여 인원 이하(이하 포함)로 내리는 것을 막기 위해 최소값을 curNumber + 1로 설정
  const minParticipantCount = (detailData?.curNumber || 0) + 1;

  // 초기 participantCount가 최소값보다 작을 경우 최소값으로 강제
  useEffect(() => {
    if (!detailData) return;
    setParticipantCount((prev) => Math.max(prev, minParticipantCount));
  }, [detailData, minParticipantCount]);

  if (isDetailLoading || isParticipantsLoading) {
    return <div>로딩 중...</div>;
  }

  if (!detailData || !participants) {
    return <div>네트워킹 게시물을 불러올 수 없습니다.</div>;
  }

  const handleComplete = async () => {
    if (!title || !selectedRepresentativeId) return;

    try {
      await modifyNetworkingMutation.mutateAsync({
        requestBody: {
          title,
          contents:
            contents ||
            '멘토링에 대한 일정을 공유해 같이 네트워킹할 멘티를 찾아보세요.',
          maxNumber: participantCount,
          representativeId: selectedRepresentativeId as number,
        },
        networkingId: networkingId,
      });
      navigate(-1);
    } catch (error) {
      console.error('Failed to modify networking post:', error);
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
      <NetworkingModifyHeader
        onComplete={handleComplete}
        isCompleteDisabled={
          title.trim() === '' ||
          selectedRepresentativeId == null ||
          modifyNetworkingMutation.isPending
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
        <ModifyRepresentativeList
          participants={participants.participants}
          isLoading={isParticipantsLoading || isDetailLoading}
          isError={isParticipantsError}
          onRetry={refetchParticipants}
          selectedId={selectedRepresentativeId}
          onSelect={setSelectedRepresentativeId}
        />
      </Content>
    </Container>
  );
};

export default NetworkingModifyPage;

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
