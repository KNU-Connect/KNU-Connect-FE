import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import type { NetworkingPost } from '@/types/networking';
import { PostItem } from './PostItem';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

type PostListProps = {
  posts: NetworkingPost[];
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export const PostList = ({
  posts,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: PostListProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

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

      {hasNextPage && (
        <ObserverTarget ref={observerTarget}>
          {isFetchingNextPage && <LoadingText>더 불러오는 중...</LoadingText>}
        </ObserverTarget>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ObserverTarget = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;
