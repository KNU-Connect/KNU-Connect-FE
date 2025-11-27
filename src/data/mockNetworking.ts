import type { NetworkingPost } from '@/types/networking';

export const mockNetworkingPosts: NetworkingPost[] = [
  {
    id: 1,
    title: '프론트엔드 멘토링',
    description:
      '밥 먹으면서 프론트엔드 개발 관련 얘기 나누실 분~\n얘기를 나누다 보니 아직 프론트엔드에 대해서 잘 모르지만 관심이 있는 분들이 많을 것 같아서 글 올려요~',
    currentParticipants: 2,
    maxParticipants: 4,
    date: '09/20',
    representative: {
      name: '김지훈',
      affiliation: '컴퓨터학부 대학원생',
      tags: ['프론트엔드', '취업', '#INTJ'],
      bio: '한줄 소개: 현재 ~~~를 하고 있어요!',
    },
  },
  {
    id: 2,
    title: '프론트엔드 멘토링',
    description: '밥 먹으면서 프론트엔드 개발 관련 얘기 나누실 분~',
    currentParticipants: 3,
    maxParticipants: 4,
    date: '09/20',
    representative: {
      name: '이영희',
      affiliation: '컴퓨터학부 4학년',
      tags: ['프론트엔드', '취업'],
      bio: '한줄 소개: React와 TypeScript를 주로 사용하고 있어요!',
    },
  },
  {
    id: 3,
    title: '프론트엔드 멘토링',
    description: '밥 먹으면서 프론트엔드 개발 관련 얘기 나누실 분~',
    currentParticipants: 2,
    maxParticipants: 4,
    date: '09/21',
    representative: {
      name: '박민수',
      affiliation: '소프트웨어학부 3학년',
      tags: ['프론트엔드', '#ENFP'],
      bio: '한줄 소개: 프론트엔드 개발에 관심이 많은 학생입니다!',
    },
  },
  {
    id: 4,
    title: '프론트엔드 멘토링',
    description: '밥 먹으면서 프론트엔드 개발 관련 얘기 나누실 분~',
    currentParticipants: 2,
    maxParticipants: 4,
    date: '09/22',
    representative: {
      name: '최수진',
      affiliation: '컴퓨터학부 대학원생',
      tags: ['프론트엔드', '취업', '#ISTJ'],
      bio: '한줄 소개: 웹 개발 경험을 공유하고 싶어요!',
    },
  },
];

