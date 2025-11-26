import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { mockNetworkingPosts } from '@/data/mockNetworking';
import { NetworkingDescription, RepresentInfo } from './components';
import { NetworkingDetailHeader } from './components/NetworkingDetailHeader';
import { HEADER_HEIGHT, NAV_HEIGHT } from '@/constants';

const NetworkingDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const post = mockNetworkingPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Container>
        <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <NetworkingDetailHeader />
      <Content>
        <NetworkingDescription post={post} />
        <RepresentInfo post={post} />
        <JoinButton
          onClick={() => {
            // TODO: 그룹채팅방 참여 로직
          }}
        >
          그룹채팅방 참여하기
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

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.colors.text.sub};
`;
