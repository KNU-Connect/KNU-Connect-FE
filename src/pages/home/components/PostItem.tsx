import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import type { NetworkingPost } from '@/types/networking';
import { ROUTES } from '@/routes';

type PostItemProps = {
  post: NetworkingPost;
};

export const PostItem = ({ post }: PostItemProps) => {
  const navigate = useNavigate();

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(ROUTES.NETWORKING_DETAIL.replace(':id', post.id.toString()));
  };

  return (
    <Item>
      <PostContent>
        <TitleContainer>
          <PostTitle>{post.title}</PostTitle>
        </TitleContainer>
        <PostDescription>{post.description.split('\n')[0]}</PostDescription>
        <PostMeta>
          <Wrapper>
            <Participants>
              {post.currentParticipants} / {post.maxParticipants}명
            </Participants>
            <Date>{post.date}</Date>
          </Wrapper>
          {post.isParticipating && (
            <ParticipatingBadge>해당 채팅방에 참여중입니다.</ParticipatingBadge>
          )}
        </PostMeta>
      </PostContent>
      <JoinButton onClick={handleJoinClick}>게시글 상세보기</JoinButton>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.subtitle2.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  word-break: break-word;
  overflow-wrap: break-word;
  margin: 0;
`;

const ParticipatingBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body3.lineHeight};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex-shrink: 0;
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
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
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

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
