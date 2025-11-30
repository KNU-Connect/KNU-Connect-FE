import type { Theme } from '@emotion/react';
import type { NetworkingTag } from '@/types/networking';

/**
 * 네트워킹 태그에 해당하는 색상을 반환합니다.
 * @param tag - 네트워킹 태그
 * @param theme - Emotion 테마 객체
 * @returns 태그에 해당하는 색상 코드
 */
export const getTagColor = (tag: NetworkingTag, theme: Theme): string => {
  if (tag === '프론트엔드' || tag === '백엔드') {
    return theme.colors.tag.purple;
  }
  if (tag === '취업') {
    return theme.colors.tag.blue;
  }
  return theme.colors.tag.gold;
};
