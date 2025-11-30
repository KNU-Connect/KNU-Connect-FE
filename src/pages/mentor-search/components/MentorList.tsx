import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
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

export const MentorList = ({
  mentors,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: MentorListProps) => {
  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          onLoadMore
        ) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTargetRef.current;
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
      {mentors.map((mentor) => (
        <MentorCard key={mentor.mentorId} mentor={mentor} />
      ))}
      {hasNextPage && (
        <ObserverTarget ref={observerTargetRef}>
          {isFetchingNextPage && <LoadingText>더 불러오는 중...</LoadingText>}
        </ObserverTarget>
      )}
    </Container>
  );
};
