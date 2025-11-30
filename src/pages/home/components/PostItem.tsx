import styled from '@emotion/styled';
import type { NetworkingPost } from '@/types/networking';
import { useParticipateNetworking } from '@/pages/networking/hooks/useParticipateNetworking';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

type PostItemProps = {
  post: NetworkingPost;
};

export const PostItem = ({ post }: PostItemProps) => {
  const { mutate: participate, isPending } = useParticipateNetworking();
  const navigate = useNavigate();

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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

  return (
    <Item>
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.description.split('\n')[0]}</PostDescription>
        <PostMeta>
          <Participants>
            {post.currentParticipants} / {post.maxParticipants}명
          </Participants>
          <Date>{post.date}</Date>
        </PostMeta>
      </PostContent>
      <JoinButton
        onClick={handleJoin}
        disabled={isPending || post.isParticipating}
      >
        {isPending
          ? '참여 중...'
          : post.isParticipating
            ? '참여중인 네트워킹입니다'
            : '그룹채팅방 참여하기'}
      </JoinButton>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[10]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.gray[20]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;
`;

const PostDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Participants = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const JoinButton = styled.button`
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  cursor: pointer;
  transition: opacity 0.2s;
  box-sizing: border-box;
  text-align: center;

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
