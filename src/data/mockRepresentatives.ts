import type { NetworkingTag } from '@/types/networking';

export type Representative = {
  id: number;
  name: string;
  affiliation: string;
  tags: NetworkingTag[];
  bio: string;
  profileImage?: string;
};

export const mockRepresentatives: Representative[] = [
  {
    id: 1,
    name: '김지훈',
    affiliation: '컴퓨터학부 대학원생',
    tags: ['프론트엔드', '취업', '#INTJ'],
    bio: '한줄 소개: 현재 ~~~를 하고 있어요!',
  },
  {
    id: 2,
    name: '정인준',
    affiliation: '컴퓨터학부 대학원생',
    tags: ['프론트엔드', '취업', '#INTJ'],
    bio: '한줄 소개: 현재 ~~~를 하고 있어요!',
  },
];
