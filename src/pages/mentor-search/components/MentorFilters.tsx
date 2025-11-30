import styled from '@emotion/styled';
import { CustomDropdown } from '@/components/common';
import { theme } from '@/styles/theme';
import { careerValues, interestValues } from '@/pages/auth/hooks/signUpSchema';
import { X } from 'lucide-react';

type MentorFiltersProps = {
  career: string;
  interest: string;
  onCareerChange: (value: string) => void;
  onInterestChange: (value: string) => void;
  onReset: () => void;
};

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 0 ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  align-items: center;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.text.sub};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[10]};
    border-color: ${({ theme }) => theme.colors.gray[50]};
  }

  &:active {
    opacity: 0.8;
  }
`;

const getCareerLabel = (value: string) => {
  const labels: Record<string, string> = {
    employment: '취업',
    startup: '창업',
    matriculation: '진학',
  };
  return labels[value] || value;
};

const getInterestLabel = (value: string) => {
  const labels: Record<string, string> = {
    frontend: '프론트엔드',
    backend: '백엔드',
    data: '데이터',
    ai: '인공지능',
    security: '보안',
  };
  return labels[value] || value;
};

export const MentorFilters = ({
  career,
  interest,
  onCareerChange,
  onInterestChange,
  onReset,
}: MentorFiltersProps) => {
  const careerOptions = [
    { value: '', label: '진로 선택' },
    ...careerValues.map((value) => ({
      value,
      label: getCareerLabel(value),
    })),
  ];

  const interestOptions = [
    { value: '', label: '분야 선택' },
    ...interestValues.map((value) => ({
      value,
      label: getInterestLabel(value),
    })),
  ];

  const hasActiveFilters = career || interest;

  return (
    <Container>
      <CustomDropdown
        value={interest || ''}
        options={interestOptions}
        onChange={onInterestChange}
        color={theme.colors.tag.purple}
      />
      <CustomDropdown
        value={career || ''}
        options={careerOptions}
        onChange={onCareerChange}
        color={theme.colors.tag.blue}
      />
      {hasActiveFilters && (
        <ResetButton onClick={onReset} type='button'>
          <X size={16} />
          필터 초기화
        </ResetButton>
      )}
    </Container>
  );
};
