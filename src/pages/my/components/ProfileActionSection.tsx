import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '@/components/common';
import { ROUTES } from '@/routes';

type ProfileActionSectionProps = {
  isEditMode: boolean;
  onClickEdit: () => void;
  onClickSave: () => void;
  onClickCancel: () => void;
};

const ButtonSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const EditProfileButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: 20px;
  text-align: center;

  ${({ theme }) => theme.typography.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
`;

const OutlineButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const SaveButton = styled(MainButton)`
  background-color: ${({ theme }) => theme.colors.gray[20]};
  color: ${({ theme }) => theme.colors.text.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    opacity: 0.9;
  }
`;

export const ProfileActionSection = ({
  isEditMode,
  onClickEdit,
  onClickSave,
  onClickCancel,
}: ProfileActionSectionProps) => {
  const navigate = useNavigate();

  const handleNavigateToMyPosts = () => {
    navigate(ROUTES.MY_POSTS);
  };

  return (
    <ButtonSection>
      {isEditMode ? (
        <>
          <SaveButton onClick={onClickSave} fullWidth>
            프로필 저장
          </SaveButton>
          <EditProfileButton onClick={onClickCancel}>취소</EditProfileButton>
        </>
      ) : (
        <>
          <EditProfileButton onClick={onClickEdit}>
            프로필 수정
          </EditProfileButton>

          <OutlineButton onClick={handleNavigateToMyPosts}>
            내가 작성한 글 보러가기
          </OutlineButton>

          <MainButton fullWidth>로그아웃</MainButton>
        </>
      )}
    </ButtonSection>
  );
};
