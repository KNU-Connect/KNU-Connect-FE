import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { NetworkingDescription, RepresentInfo } from './components';
import { NetworkingDetailHeader } from './components/NetworkingDetailHeader';
import { HEADER_HEIGHT, NAV_HEIGHT } from '@/constants';
import { chatQueryKeys } from '@/constants/queryKeys';
import { Tag } from '@/components/common';
import { useNetworkingDetail } from './hooks/useNetworkingDetail';
import { convertDetailToPost } from './services/networking';
import { useParticipateNetworking } from './hooks/useParticipateNetworking';
import { getChatRoomParticipants } from '@/pages/networking-create/services/networking';
import type { ChatParticipant } from '@/types/chat';
import {
  buildParticipantTagItems,
  mapDepartmentLabel,
} from '@/utils/networking';
import { ROUTES } from '@/routes';

const NetworkingDetailPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const networkingId = id ? Number(id) : 0;

  const { data, isLoading, error } = useNetworkingDetail(networkingId);
  const { mutate: participate, isPending } = useParticipateNetworking();
  const chatRoomId = data?.chatRoomId ?? undefined;

  const participantsQueryKey = chatRoomId
    ? chatQueryKeys.participants(chatRoomId)
    : ([...chatQueryKeys.all, 'participants', 'detail', networkingId] as const);

  const {
    data: participants = [],
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
  } = useQuery<ChatParticipant[]>({
    queryKey: participantsQueryKey,
    queryFn: () => getChatRoomParticipants(chatRoomId as number),
    enabled: !!chatRoomId,
  });

  const handleJoin = () => {
    participate(
      { networkingId: post.id },
      {
        onSuccess: () => {
          navigate(ROUTES.CHAT);
        },
        onError: () => {
          alert('네트워킹 참여에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const post = convertDetailToPost(data);

  return (
    <Container>
      <NetworkingDetailHeader />
      <Content>
        <NetworkingDescription post={post} />
        <RepresentInfo post={post} />
        {chatRoomId && (
          <ParticipantSection>
            <SectionTitle>대표자 후보</SectionTitle>
            {isParticipantsLoading && (
              <SectionMessage>
                채팅방 참여자를 불러오는 중입니다.
              </SectionMessage>
            )}
            {isParticipantsError && (
              <SectionMessage role='alert'>
                참여자 목록을 불러오지 못했습니다.
              </SectionMessage>
            )}
            {!isParticipantsLoading &&
              !isParticipantsError &&
              participants.length === 0 && (
                <SectionMessage>아직 채팅방 참여자가 없습니다.</SectionMessage>
              )}
            {!isParticipantsLoading &&
              !isParticipantsError &&
              participants.length > 0 && (
                <ParticipantList>
                  {participants.map((participant) => {
                    const affiliation =
                      mapDepartmentLabel(participant.department) ||
                      '소속 정보 없음';
                    const tagItems = buildParticipantTagItems(participant, {
                      interest: theme.colors.tag.purple,
                      career: theme.colors.tag.blue,
                      mbti: theme.colors.tag.gold,
                    });

                    return (
                      <ParticipantCard key={participant.userId}>
                        <ParticipantName>{participant.name}</ParticipantName>
                        <ParticipantMeta>{affiliation}</ParticipantMeta>
                        {tagItems.length > 0 && (
                          <TagList>
                            {tagItems.map((tag) => (
                              <Tag
                                key={`${participant.userId}-${tag.label}`}
                                tag={tag.label}
                                color={tag.color}
                              />
                            ))}
                          </TagList>
                        )}
                        {participant.introduction && (
                          <ParticipantIntro>
                            {participant.introduction}
                          </ParticipantIntro>
                        )}
                      </ParticipantCard>
                    );
                  })}
                </ParticipantList>
              )}
          </ParticipantSection>
        )}
        <JoinButton
          onClick={handleJoin}
          disabled={
            isPending ||
            post.isParticipating ||
            post.currentParticipants >= post.maxParticipants
          }
        >
          {isPending
            ? '참여 중...'
            : post.isParticipating
              ? '참여중인 네트워킹입니다'
              : post.currentParticipants >= post.maxParticipants
                ? '가득 찬 네트워킹입니다'
                : '그룹채팅방 참여하기'}
        </JoinButton>
      </Content>
    </Container>
  );
};

export default NetworkingDetailPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - ${HEADER_HEIGHT}px - ${NAV_HEIGHT}px - 57px);
  padding: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${NAV_HEIGHT}px;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const JoinButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  cursor: pointer;
  transition: opacity 0.2s;
  text-align: center;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const ParticipantSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const SectionMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const ParticipantList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ParticipantCard = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.colors.background};
`;

const ParticipantName = styled.h3`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  margin: 0;
`;

const ParticipantMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  margin: 0;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ParticipantIntro = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
`;
