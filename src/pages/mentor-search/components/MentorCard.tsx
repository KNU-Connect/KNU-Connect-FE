import styled from '@emotion/styled';
import { CircleUserRound } from 'lucide-react';
import { Tag } from '@/components/common';
import { theme } from '@/styles/theme';
import type { Mentor } from '../services/mentor';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

type MentorCardProps = {
  mentor: Mentor;
};

const getStatusLabel = (value: string) => {
  const labels: Record<string, string> = {
    student: '재학생',
    graduate: '졸업생',
    postgraduate: '대학원생',
    professor: '교수',
  };
  return labels[value] || value;
};

const getDepartmentLabel = (value: string) => {
  const labels: Record<string, string> = {
    computer: '컴퓨터학부',
  };
  return labels[value] || value;
};

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

const getMbtiLabel = (value: string) => {
  if (value === '모름') return '모름';
  return `#${value}`;
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.spacing[4]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: flex-start;
`;

const ProfileIcon = styled(CircleUserRound)`
  width: 80px;
  height: 80px;
  color: ${({ theme }) => theme.colors.gray[70]};
  flex-shrink: 0;
  stroke-width: 1;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  flex: 1;
`;

const Name = styled.h2`
  ${({ theme }) => theme.typography.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const StatusText = styled.p`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.colors.text.sub};
`;

const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const IntroLabel = styled.span`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.text.sub};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const IntroText = styled.div<{ isEmpty?: boolean }>`
  ${({ theme }) => theme.typography.body2};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme, isEmpty }) =>
    isEmpty ? theme.colors.text.sub : theme.colors.text.default};
`;

const ViewDetailsButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: opacity 0.2s;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const MentorCard = ({ mentor }: MentorCardProps) => {
  const navigate = useNavigate();
  const statusLabel = getStatusLabel(mentor.status);
  const departmentLabel = getDepartmentLabel(mentor.department);
  const careerLabel = getCareerLabel(mentor.career);
  const interestLabel = getInterestLabel(mentor.interest);
  const mbtiLabel = getMbtiLabel(mentor.mbti);

  const profileTags = [
    { text: interestLabel, color: theme.colors.tag.purple },
    { text: careerLabel, color: theme.colors.tag.blue },
    { text: mbtiLabel, color: theme.colors.tag.gold },
  ];

  const handleViewDetails = () => {
    navigate(
      `${ROUTES.MENTOR_DETAIL.replace(':id', mentor.mentorId.toString())}`,
    );
  };

  return (
    <Card>
      <ProfileHeader>
        <ProfileIcon />
        <ProfileInfo>
          <Name>{mentor.name}</Name>
          <StatusText>
            {departmentLabel} {statusLabel}
          </StatusText>
          <TagList>
            {profileTags.map((tag) => (
              <Tag key={tag.text} tag={tag.text} color={tag.color} />
            ))}
          </TagList>
        </ProfileInfo>
      </ProfileHeader>
      <IntroSection>
        <IntroLabel>한줄 소개</IntroLabel>
        <IntroText
          isEmpty={!mentor.introduction || mentor.introduction.trim() === ''}
        >
          {!mentor.introduction || mentor.introduction.trim() === ''
            ? '멘토의 한줄소개가 아직 없습니다.'
            : mentor.introduction}
        </IntroText>
      </IntroSection>
      <ViewDetailsButton onClick={handleViewDetails}>
        멘토 상세보기
      </ViewDetailsButton>
    </Card>
  );
};
