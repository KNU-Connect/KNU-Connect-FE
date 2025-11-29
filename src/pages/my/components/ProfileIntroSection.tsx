import styled from '@emotion/styled';
import {
  FieldLabel,
  MentorDescription,
} from '@/pages/auth/components/signUpStyles';
import { TextField } from '@/components/common';

type ProfileIntroSectionProps = {
  isEditMode: boolean;
  isMentor: boolean;
  shortIntro: string;
  detailIntro: string;
  onChangeShortIntro: (value: string) => void;
  onChangeDetailIntro: (value: string) => void;
};

const ShortIntro = styled.div`
  ${({ theme }) => theme.typography.body2};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};

  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.text.default};
`;

const DetailIntro = styled.div`
  ${({ theme }) => theme.typography.body2};
  margin-top: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.gray[10]};
  color: ${({ theme }) => theme.colors.text.default};
  white-space: pre-wrap;

  p + p {
    margin-top: ${({ theme }) => theme.spacing[1]};
  }
`;

const DetailIntroTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  font-family: inherit;
  resize: none;
  opacity: 0.8;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.sub};
  }

  &:focus {
    outline: none;
  }
`;

export const ProfileIntroSection = ({
  isEditMode,
  isMentor,
  shortIntro,
  detailIntro,
  onChangeShortIntro,
  onChangeDetailIntro,
}: ProfileIntroSectionProps) => {
  if (!isEditMode) {
    return (
      <>
        <FieldLabel>멘토 활동 여부</FieldLabel>
        <MentorDescription>
          멘토로 활동 중인 유저도 멘티로 참여할 수 있습니다.
        </MentorDescription>
        <ShortIntro>
          {isMentor ? '멘토, 멘티로 활동 중' : '멘티로 활동 중.'}
        </ShortIntro>

        <FieldLabel>한줄 소개</FieldLabel>
        <ShortIntro>{shortIntro}</ShortIntro>
        <FieldLabel>상세 소개</FieldLabel>
        <DetailIntro>
          {detailIntro.split('\n').map((line) => (
            <p key={line}>{line}</p>
          ))}
        </DetailIntro>
      </>
    );
  }

  return (
    <>
      <FieldLabel>한줄 소개</FieldLabel>
      <TextField
        value={shortIntro}
        onChange={(event) => onChangeShortIntro(event.target.value)}
        placeholder='한줄 소개를 입력해주세요'
      />

      <FieldLabel>상세 소개</FieldLabel>
      <DetailIntroTextArea
        value={detailIntro}
        onChange={(event) => onChangeDetailIntro(event.target.value)}
        placeholder='상세 소개를 입력해주세요'
        style={{ minHeight: '150px' }}
      />
    </>
  );
};
