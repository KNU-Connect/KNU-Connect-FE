import styled from '@emotion/styled';
import { CircleUserRound } from 'lucide-react';
import { CustomDropdown, Tag } from '@/components/common';
import {
  FieldLabel,
  MentorToggleContainer,
  MentorToggleButton,
  MentorDescription,
} from '@/components/auth/signUpStyles';
import { theme } from '@/styles/theme';
import {
  careerValues,
  departmentValues,
  interestValues,
  mbtiValues,
  statusValues,
} from '@/pages/auth/signup/signUpSchema';

type ProfileHeaderSectionProps = {
  isEditMode: boolean;
  name: string;
  status: string;
  department: string;
  career: string;
  interest: string;
  mbti: string;
  isMentor: boolean;
  onChangeStatus: (status: string) => void;
  onChangeDepartment: (department: string) => void;
  onChangeCareer: (career: string) => void;
  onChangeInterest: (interest: string) => void;
  onChangeMbti: (mbti: string) => void;
  onChangeIsMentor: (isMentor: boolean) => void;
};

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
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

type TagInfo = {
  text: string;
  color: string;
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

const getDepartmentLabel = (value: string) => {
  const labels: Record<string, string> = {
    computer: '컴퓨터학부',
  };
  return labels[value] || value;
};

const getMbtiLabel = (value: string) => {
  if (value === '모름') return '모름';
  return `#${value}`;
};

const getTagColor = (text: string) => {
  if (text === '프론트엔드' || text === '백엔드')
    return theme.colors.tag.purple;
  if (text === '취업') return theme.colors.tag.blue;
  return theme.colors.tag.gold;
};

export const ProfileHeaderSection = ({
  isEditMode,
  name,
  status,
  department,
  career,
  interest,
  mbti,
  isMentor,
  onChangeStatus,
  onChangeDepartment,
  onChangeCareer,
  onChangeInterest,
  onChangeMbti,
  onChangeIsMentor,
}: ProfileHeaderSectionProps) => {
  const statusLabel = getStatusLabel(status);
  const departmentLabel = getDepartmentLabel(department);
  const careerLabel = getCareerLabel(career);
  const interestLabel = getInterestLabel(interest);
  const mbtiLabel = getMbtiLabel(mbti);

  const profileTags: TagInfo[] = [
    { text: interestLabel, color: theme.colors.tag.purple },
    { text: careerLabel, color: theme.colors.tag.blue },
    { text: mbtiLabel, color: theme.colors.tag.gold },
  ];

  return (
    <ProfileSection>
      <ProfileHeader>
        <ProfileIcon />

        <ProfileInfo>
          <Name>{name}</Name>

          {isEditMode ? (
            <>
              <FieldLabel>재학 구분</FieldLabel>
              <CustomDropdown
                value={status}
                options={statusValues.map((value) => ({
                  value,
                  label: getStatusLabel(value),
                }))}
                onChange={onChangeStatus}
                isStatusType
              />
            </>
          ) : (
            <StatusText>{statusLabel}</StatusText>
          )}

          {isEditMode ? (
            <>
              <FieldLabel>전공</FieldLabel>
              <CustomDropdown
                value={department}
                options={departmentValues.map((value) => ({
                  value,
                  label: getDepartmentLabel(value),
                }))}
                onChange={onChangeDepartment}
                isStatusType
              />
            </>
          ) : (
            <StatusText>{departmentLabel}</StatusText>
          )}

          {isEditMode ? (
            <TagList>
              <CustomDropdown
                value={interest}
                options={interestValues.map((value) => ({
                  value,
                  label: getInterestLabel(value),
                }))}
                onChange={onChangeInterest}
                color={getTagColor('프론트엔드')}
              />
              <CustomDropdown
                value={career}
                options={careerValues.map((value) => ({
                  value,
                  label: getCareerLabel(value),
                }))}
                onChange={onChangeCareer}
                color={getTagColor('취업')}
              />
              <CustomDropdown
                value={mbti}
                options={mbtiValues.map((value) => ({
                  value,
                  label: getMbtiLabel(value),
                }))}
                onChange={onChangeMbti}
                color={getTagColor('#INTJ')}
              />
            </TagList>
          ) : (
            <TagList>
              {profileTags.map((tag) => (
                <Tag key={tag.text} tag={tag.text} color={tag.color} />
              ))}
            </TagList>
          )}
        </ProfileInfo>
      </ProfileHeader>

      {isEditMode && (
        <>
          <FieldLabel>멘토 활동 여부</FieldLabel>
          <MentorDescription>
            쿠넥트에서 멘토로 활동하실 의향이 있다면 &apos;네&apos;를
            선택해주세요.
            <br />
            멘토로 활동 중인 유저도 멘티로 참여할 수 있습니다.
          </MentorDescription>
          <MentorToggleContainer>
            <MentorToggleButton
              type='button'
              isActive={isMentor}
              onClick={() => onChangeIsMentor(true)}
            >
              네
            </MentorToggleButton>
            <MentorToggleButton
              type='button'
              isActive={!isMentor}
              onClick={() => onChangeIsMentor(false)}
            >
              아니오
            </MentorToggleButton>
          </MentorToggleContainer>
        </>
      )}
    </ProfileSection>
  );
};
