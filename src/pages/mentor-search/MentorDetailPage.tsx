import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { ProfileHeaderSection } from '@/pages/my/components/ProfileHeaderSection';
import { ProfileIntroSection } from '@/pages/my/components/ProfileIntroSection';
import { MainButton } from '@/components/common';
import { useMentorDetail } from './hooks/useMentorDetail';
import { useCreateChatRoom } from './hooks/useCreateChatRoom';
import { PageSpinner } from '@/components/common';
import { useUserProfile } from '@/pages/my/hooks/useUserProfile';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[6]};
  gap: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SendMessageButton = styled(MainButton)<{ $isDisabled?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[4]};

  ${({ $isDisabled, theme }) =>
    $isDisabled &&
    `
    background-color: ${theme.colors.gray[40]};
    color: ${theme.colors.text.white};
    opacity: 1;
    cursor: not-allowed;
  `}
`;

const DisabledMessage = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  text-align: center;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const ErrorText = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const MentorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mentorId = id ? Number(id) : 0;

  const { data: mentor, isLoading, error } = useMentorDetail(mentorId);
  const { data: currentUser } = useUserProfile();
  const createChatRoomMutation = useCreateChatRoom();

  const isOwnProfile =
    currentUser?.id !== undefined && mentor?.mentorId === currentUser.id;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendMessage = async () => {
    if (!mentor) return;

    try {
      await createChatRoomMutation.mutateAsync({
        participant_id: mentor.mentorId,
      });
    } catch (error) {
      toast.error('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <PageSpinner />
      </Container>
    );
  }

  if (error || !mentor) {
    return (
      <Container>
        <ErrorText>멘토 정보를 불러오는 중 오류가 발생했습니다.</ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack} type='button'>
          <ArrowLeft size={24} />
        </BackButton>
      </Header>

      <Content>
        <ProfileHeaderSection
          isEditMode={false}
          name={mentor.name}
          status={mentor.status}
          department={mentor.department}
          career={mentor.career}
          interest={mentor.interest}
          mbti={mentor.mbti}
          isMentor={true}
        />

        <ProfileIntroSection
          isEditMode={false}
          isMentor={true}
          shortIntro={mentor.introduction || ''}
          detailIntro={mentor.detail_introduction || ''}
          isMentorView={true}
        />

        <SendMessageButton
          onClick={handleSendMessage}
          disabled={isOwnProfile || createChatRoomMutation.isPending}
          $isDisabled={isOwnProfile}
        >
          메시지 보내기
        </SendMessageButton>
        {isOwnProfile && (
          <DisabledMessage>자신에게 메시지를 보낼 수 없습니다.</DisabledMessage>
        )}
      </Content>
    </Container>
  );
};

export default MentorDetailPage;
