import styled from '@emotion/styled';
import { useState } from 'react';
import { SearchBar, InfoInputButton, PostList } from './components';
import { useNetworkingList } from './hooks/useNetworkingList';
import { convertBoardToPost } from './services/networking';

const HomePage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNetworkingList({
    keyword: keyword || undefined,
    pageable: {
      size: 10,
    },
  });

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  // 모든 페이지의 boards를 평탄화
  const posts =
    data?.pages.flatMap((page) => page.boards.map(convertBoardToPost)) ?? [];

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <InfoInputButton />
      {isLoading && <LoadingText>로딩 중...</LoadingText>}
      {error && (
        <ErrorText>게시물을 불러오는 중 오류가 발생했습니다.</ErrorText>
      )}
      {!isLoading && !error && (
        <PostList
          posts={posts}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const LoadingText = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const ErrorText = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;
