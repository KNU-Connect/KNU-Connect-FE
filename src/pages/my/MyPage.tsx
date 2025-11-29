import styled from '@emotion/styled';
import { useState, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';
import {
  ProfileActionSection,
  ProfileHeaderSection,
  ProfileIntroSection,
} from './components';
import { useUserProfile, useUpdateUserProfile } from './hooks/useUserProfile';
import { PageSpinner, ErrorBoundary } from '@/components/common';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.background};
`;

const MyPageContent: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string>('student');
  const [department, setDepartment] = useState<string>('computer');
  const [career, setCareer] = useState<string>('employment');
  const [interest, setInterest] = useState<string>('frontend');
  const [mbti, setMbti] = useState<string>('INTJ');
  const [isMentor, setIsMentor] = useState(false);
  const [shortIntro, setShortIntro] = useState('');
  const [detailIntro, setDetailIntro] = useState('');

  const [originalData, setOriginalData] = useState({
    name: '',
    status: 'student',
    department: 'computer',
    career: 'employment',
    interest: 'frontend',
    mbti: 'INTJ',
    isMentor: false,
    shortIntro: '',
    detailIntro: '',
  });

  const { data: userProfile } = useUserProfile();
  const updateUserProfile = useUpdateUserProfile();

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setStatus(userProfile.status);
      setDepartment(userProfile.department);
      setCareer(userProfile.career);
      setInterest(userProfile.interest);
      setMbti(userProfile.mbti);
      setIsMentor(userProfile.mentor);
      setShortIntro(userProfile.introduction);
      setDetailIntro(userProfile.detail_introduction);

      setOriginalData({
        name: userProfile.name,
        status: userProfile.status,
        department: userProfile.department,
        career: userProfile.career,
        interest: userProfile.interest,
        mbti: userProfile.mbti,
        isMentor: userProfile.mentor,
        shortIntro: userProfile.introduction,
        detailIntro: userProfile.detail_introduction,
      });
    }
  }, [userProfile]);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile.mutateAsync({
        status,
        department,
        career,
        interest,
        mbti,
        mentor: isMentor,
        introduction: shortIntro,
        detail_introduction: detailIntro,
      });
      setIsEditMode(false);
      setOriginalData({
        name,
        status,
        department,
        career,
        interest,
        mbti,
        isMentor,
        shortIntro,
        detailIntro,
      });
    } catch (error) {
      toast.error('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelEdit = () => {
    setName(originalData.name);
    setStatus(originalData.status);
    setDepartment(originalData.department);
    setCareer(originalData.career);
    setInterest(originalData.interest);
    setMbti(originalData.mbti);
    setIsMentor(originalData.isMentor);
    setShortIntro(originalData.shortIntro);
    setDetailIntro(originalData.detailIntro);
    setIsEditMode(false);
  };

  return (
    <PageContainer>
      <ProfileHeaderSection
        isEditMode={isEditMode}
        name={name}
        status={status}
        department={department}
        career={career}
        interest={interest}
        mbti={mbti}
        isMentor={isMentor}
        onChangeStatus={setStatus}
        onChangeDepartment={setDepartment}
        onChangeCareer={setCareer}
        onChangeInterest={setInterest}
        onChangeMbti={setMbti}
        onChangeIsMentor={setIsMentor}
      />

      <ProfileIntroSection
        isEditMode={isEditMode}
        isMentor={isMentor}
        shortIntro={shortIntro}
        detailIntro={detailIntro}
        onChangeShortIntro={setShortIntro}
        onChangeDetailIntro={setDetailIntro}
      />

      <ProfileActionSection
        isEditMode={isEditMode}
        onClickEdit={handleEditProfile}
        onClickSave={handleSaveProfile}
        onClickCancel={handleCancelEdit}
      />
    </PageContainer>
  );
};

export const MyPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSpinner />}>
        <MyPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MyPage;
