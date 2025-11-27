export type NetworkingTag = '프론트엔드' | '백엔드' | '취업' | '#INTJ' | '#ENFP' | '#ISTJ';

export type NetworkingPost = {
  id: number;
  title: string;
  description: string;
  currentParticipants: number;
  maxParticipants: number;
  date: string; // MM/DD 형식
  representative: {
    name: string;
    affiliation: string;
    tags: NetworkingTag[];
    bio: string;
    profileImage?: string;
  };
};

