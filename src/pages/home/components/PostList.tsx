import styled from '@emotion/styled';
import type { NetworkingPost } from '@/types/networking';
import { PostItem } from './PostItem';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { PencilLine } from 'lucide-react';
import { NAV_HEIGHT } from '@/constants';

type PostListProps = {
  posts: NetworkingPost[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <Container>
      {posts.map((post) => (
        <Link
          to={ROUTES.NETWORKING_DETAIL.replace(':id', post.id.toString())}
          key={post.id}
        >
          <PostItem post={post} />
        </Link>
      ))}

      <FloatingActionButton>
        <PencilLine size={24} />
      </FloatingActionButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const FloatingActionButton = styled.button`
  position: fixed;
  right: ${({ theme }) => theme.spacing[6]};
  bottom: ${NAV_HEIGHT + 16}px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;
