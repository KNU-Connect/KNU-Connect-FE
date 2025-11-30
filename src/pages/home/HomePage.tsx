import styled from '@emotion/styled';
import { useState } from 'react';
import { SearchBar, PostList } from './components';
import { useNetworkingList } from './hooks/useNetworkingList';
import { convertBoardToPost } from './services/networking';
import { HEADER_HEIGHT, NAV_HEIGHT } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { PencilLine } from 'lucide-react';
import { ROUTES } from '@/routes';

const HomePage = () => {
  const navigate = useNavigate();
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

  const handleWrite = () => {
    navigate(ROUTES.NETWORKING_CREATE.replace(':chatId', 'new'));
  };

  // 모든 페이지의 boards를 평탄화
  const posts =
    data?.pages.flatMap((page) => page.boards.map(convertBoardToPost)) ?? [];

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
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

      <FloatingActionButton onClick={handleWrite} aria-label='새 글 작성'>
        <PencilLine size={24} />
      </FloatingActionButton>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  gap: ${({ theme }) => theme.spacing[4]};
  min-height: calc(100dvh - ${HEADER_HEIGHT}px - ${NAV_HEIGHT}px);
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

const FloatingActionButton = styled.button`
  position: sticky;
  align-self: flex-end;
  margin-right: ${({ theme }) => theme.spacing[4]};
  bottom: calc(${NAV_HEIGHT}px + ${({ theme }) => theme.spacing[4]});
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
