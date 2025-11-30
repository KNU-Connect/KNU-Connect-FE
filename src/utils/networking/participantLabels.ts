import type { ChatParticipant } from '@/types/chat';

const DEPARTMENT_LABELS: Record<string, string> = {
  COMPUTER: '컴퓨터학부',
};

const INTEREST_LABELS: Record<string, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  DATA: '데이터',
  AI: '인공지능',
  SECURITY: '보안',
};

const CAREER_LABELS: Record<string, string> = {
  EMPLOYMENT: '취업',
  STARTUP: '창업',
  GRADUATE: '진학',
};

const normalizeKey = (value: string) => value.trim().toUpperCase();

const toKoreanLabel = (
  value: string | null | undefined,
  dictionary: Record<string, string>,
): string => {
  if (!value) return '';
  const normalized = normalizeKey(value);
  return dictionary[normalized] ?? value;
};

export const mapDepartmentLabel = (department?: string | null): string =>
  toKoreanLabel(department, DEPARTMENT_LABELS);

export const mapInterestLabel = (interest?: string | null): string =>
  toKoreanLabel(interest, INTEREST_LABELS);

export const mapCareerLabel = (career?: string | null): string =>
  toKoreanLabel(career, CAREER_LABELS);

export const formatMbtiLabel = (mbti?: string | null): string => {
  if (!mbti) return '';
  const compact = mbti.trim();
  if (!compact) return '';
  return compact.startsWith('#') ? compact : `#${compact.toUpperCase()}`;
};

export type ParticipantTagItem = {
  label: string;
  color: string;
};

export const buildParticipantTagItems = (
  participant: ChatParticipant,
  themeColors: {
    interest: string;
    career: string;
    mbti: string;
  },
): ParticipantTagItem[] => {
  const items: ParticipantTagItem[] = [];

  const interestLabel = mapInterestLabel(participant.interest);
  if (interestLabel) {
    items.push({ label: interestLabel, color: themeColors.interest });
  }

  const careerLabel = mapCareerLabel(participant.career);
  if (careerLabel) {
    items.push({ label: careerLabel, color: themeColors.career });
  }

  const mbtiLabel = formatMbtiLabel(participant.mbti);
  if (mbtiLabel) {
    items.push({ label: mbtiLabel, color: themeColors.mbti });
  }

  return items;
};
