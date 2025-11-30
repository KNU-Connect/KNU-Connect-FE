import axiosInstance from '@/api/axiosInstance';

export interface Mentor {
  mentorId: number;
  name: string;
  department: string;
  status: string;
  career: string;
  interest: string;
  mbti: string;
  introduction: string;
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface GetMentorListParams {
  career?: string;
  interest?: string;
  keyword?: string;
  pageable?: Pageable;
}

export interface GetMentorListResponse {
  mentors: Mentor[];
  page: number;
  size: number;
  hasNext: boolean;
}

export async function getMentorList(
  params?: GetMentorListParams,
): Promise<GetMentorListResponse> {
  const { data } = await axiosInstance.get<GetMentorListResponse>('/mentors', {
    params: {
      career: params?.career,
      interest: params?.interest,
      keyword: params?.keyword,
      pageable: {
        page: params?.pageable?.page ?? 0,
        size: params?.pageable?.size ?? 10,
        sort: params?.pageable?.sort,
      },
    },
  });

  return data;
}

export interface MentorDetail {
  mentorId: number;
  name: string;
  department: string;
  status: string;
  career: string;
  interest: string;
  mbti: string;
  introduction: string | null;
  detail_introduction: string | null;
}

export async function getMentorDetail(userId: number): Promise<MentorDetail> {
  const { data } = await axiosInstance.get<MentorDetail>(`/mentors/${userId}`);

  return data;
}
