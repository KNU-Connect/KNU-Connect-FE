import styled from '@emotion/styled';
import { MentorCard } from './MentorCard';
import type { Mentor } from '../services/mentor';

type MentorListProps = {
  mentors: Mentor[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
`;

const LoadMoreButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  color: ${({ theme }) => theme.colors.text.default};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing[2]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray[20]};
  }
`;

export const MentorList = ({
  mentors,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: MentorListProps) => {
  return (
    <Container>
      {mentors.map((mentor) => (
        <MentorCard key={mentor.mentorId} mentor={mentor} />
      ))}
      {hasNextPage && (
        <LoadMoreButton onClick={onLoadMore} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </LoadMoreButton>
      )}
    </Container>
  );
};
