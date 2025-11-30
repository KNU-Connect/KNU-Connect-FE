import styled from '@emotion/styled';
import { useState, Suspense } from 'react';
import { MentorSearchBar, MentorFilters, MentorList } from './components';
import { useMentorList } from './hooks/useMentorList';
import { PageSpinner, ErrorBoundary } from '@/components/common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const MentorSearchPageContent = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [career, setCareer] = useState<string>('');
  const [interest, setInterest] = useState<string>('');

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMentorList({
    keyword: keyword || undefined,
    career: career || undefined,
    interest: interest || undefined,
    pageable: {
      size: 10,
    },
  });

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleCareerChange = (value: string) => {
    setCareer(value);
  };

  const handleInterestChange = (value: string) => {
    setInterest(value);
  };

  const handleResetFilters = () => {
    setCareer('');
    setInterest('');
    setKeyword('');
  };

  const mentors = data?.pages.flatMap((page) => page.mentors) ?? [];

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          멘토 목록을 불러오는 중 오류가 발생했습니다.
        </ErrorMessage>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <MentorSearchBar onSearch={handleSearch} />
      <MentorFilters
        career={career}
        interest={interest}
        onCareerChange={handleCareerChange}
        onInterestChange={handleInterestChange}
        onReset={handleResetFilters}
      />
      <MentorList
        mentors={mentors}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Container>
  );
};

const MentorSearchPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSpinner />}>
        <MentorSearchPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MentorSearchPage;
