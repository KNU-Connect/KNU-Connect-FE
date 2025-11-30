import axiosInstance from '@/api/axiosInstance';
import { API_ENDPOINTS } from '@/constants';
import type { NetworkingPost, NetworkingTag } from '@/types/networking';

export interface NetworkingDetailResponse {
  id: number;
  title: string;
  contents: string;
  curNumber: number;
  maxNumber: number;
  isParticipating: boolean;
  createdAt: string;
  chatRoomId?: number;
  representative: {
    name: string;
    status: string; // 'student' | 'graduate' | 'professor'
    department: string; // 'computer' | 'software' | etc.
    career: string; // 'employment' | 'graduate' | etc.
    mbti: string; // 'ENFP' | 'INTJ' | etc.
    interest: string; // 'frontend' | 'backend' | etc.
    introduction: string;
  };
}

export async function getNetworkingDetail(
  networkingId: number,
): Promise<NetworkingDetailResponse> {
  const { data } = await axiosInstance.get<NetworkingDetailResponse>(
    API_ENDPOINTS.NETWORKING_DETAIL(networkingId),
  );

  return data;
}

/**
 * API 응답을 NetworkingPost 타입으로 변환
 */
export function convertDetailToPost(
  detail: NetworkingDetailResponse,
): NetworkingPost {
  const date = new Date(detail.createdAt);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // department를 affiliation으로 변환
  const departmentMap: Record<string, string> = {
    computer: '컴퓨터학부',
    software: '소프트웨어학부',
  };

  let affiliation = '';
  const departmentName =
    departmentMap[detail.representative.department] ||
    detail.representative.department;

  if (detail.representative.status === 'student') {
    affiliation = `${departmentName} 학생`;
  } else if (detail.representative.status === 'graduate') {
    affiliation = `${departmentName} 졸업생`;
  } else if (detail.representative.status === 'postgraduate') {
    affiliation = `${departmentName} 대학원생`;
  } else if (detail.representative.status === 'professor') {
    affiliation = `${departmentName} 교수`;
  } else {
    affiliation = departmentName;
  }

  // tags 생성: interest, career, mbti를 조합
  const tags: NetworkingTag[] = [];

  // interest 변환
  if (detail.representative.interest === 'frontend') {
    tags.push('프론트엔드');
  } else if (detail.representative.interest === 'backend') {
    tags.push('백엔드');
  }

  // career 변환
  if (detail.representative.career === 'employment') {
    tags.push('취업');
  }

  // mbti 변환
  if (detail.representative.mbti) {
    tags.push(`#${detail.representative.mbti}` as NetworkingTag);
  }

  return {
    id: detail.id,
    title: detail.title,
    description: detail.contents,
    currentParticipants: detail.curNumber,
    maxParticipants: detail.maxNumber,
    isParticipating: detail.isParticipating,
    date: `${month}/${day}`,
    representative: {
      name: detail.representative.name,
      affiliation,
      tags,
      bio: detail.representative.introduction,
    },
  };
}

export async function participateNetworking(
  networkingId: number,
): Promise<void> {
  await axiosInstance.post(
    API_ENDPOINTS.NETWORKING_PARTICIPATION(networkingId),
  );
}
