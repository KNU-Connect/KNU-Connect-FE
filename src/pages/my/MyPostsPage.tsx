import styled from '@emotion/styled';
import { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import type { NetworkingPost } from '@/types/networking';
import { useMyPosts } from './hooks/useMyPosts';
import { convertBoardToPost } from '@/pages/home/services/networking';
import { PageSpinner, ErrorBoundary } from '@/components/common';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1.fontSize};
  line-height: ${({ theme }) => theme.typography.title1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
  margin: 0;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const PostItem = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;

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
  flex: 1;
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
  margin: 0;
`;

const PostDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.colors.text.sub};
  word-break: break-word;
  overflow-wrap: break-word;
  margin: 0;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Participants = styled.span`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body3.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const Date = styled.span`
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  line-height: ${({ theme }) => theme.typography.body3.lineHeight};
  color: ${({ theme }) => theme.colors.text.default};
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
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

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing[6]};
`;

const EmptyText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.sub};
  padding: ${({ theme }) => theme.spacing[6]};
`;

type MyPostItemProps = {
  post: NetworkingPost;
  hasNotification?: boolean;
};

const MyPostItem = ({ post, hasNotification }: MyPostItemProps) => {
  return (
    <PostItem to={ROUTES.NETWORKING_DETAIL.replace(':id', post.id.toString())}>
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.description.split('\n')[0]}</PostDescription>
        <PostInfo>
          <Participants>
            {post.currentParticipants} / {post.maxParticipants}명
          </Participants>
          <Date>{post.date}</Date>
        </PostInfo>
      </PostContent>
      {hasNotification && <StatusIndicator />}
    </PostItem>
  );
};

const MyPostsPageContent: React.FC = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyPosts({
    pageable: {
      size: 10,
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts =
    data?.pages.flatMap((page) => page.boards.map(convertBoardToPost)) ?? [];

  if (isLoading) {
    return (
      <PageContainer>
        <PageSpinner />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorText>게시물을 불러오는 중 오류가 발생했습니다.</ErrorText>
      </PageContainer>
    );
  }

  if (posts.length === 0) {
    return (
      <PageContainer>
        <EmptyText>아직 작성한 글이 없습니다.</EmptyText>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader>
        <SectionTitle>내가 작성한 글</SectionTitle>
      </SectionHeader>
      <PostListContainer>
        {posts.map((post, index) => (
          <MyPostItem key={post.id} post={post} hasNotification={index === 0} />
        ))}

        {hasNextPage && (
          <ObserverTarget ref={observerTarget}>
            {isFetchingNextPage && <LoadingText>더 불러오는 중...</LoadingText>}
          </ObserverTarget>
        )}
      </PostListContainer>
    </PageContainer>
  );
};

export const MyPostsPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSpinner />}>
        <MyPostsPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MyPostsPage;
