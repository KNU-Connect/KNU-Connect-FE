import { MainButton, SelectField } from '@/components/common';
import {
  FormContainer,
  Form,
  FieldErrorMessage,
  FieldLabel,
  FieldContainer,
  MentorToggleContainer,
  MentorToggleButton,
  MentorDescription,
  ButtonContainer,
} from './signUpStyles';
import { useSignUpStep2 } from '@/hooks/auth';
import { type SignUpSchemaType } from '@/pages/auth/signup/signUpSchema';
import { mbtiValues } from '@/pages/auth/signup/signUpSchema';

interface SignUpStep2Props {
  onPrev: () => void;
  onSubmitFinal: (data: SignUpSchemaType) => void;
}

export const SignUpStep2 = ({ onPrev, onSubmitFinal }: SignUpStep2Props) => {
  const {
    register,
    handleSubmit,
    errors,
    isMentor,
    handleStep2Submit,
    handleMentorToggle,
    watch,
    isSignUpDisabled,
  } = useSignUpStep2(onPrev, onSubmitFinal);

  const status = watch('status');
  const career = watch('career');
  const interest = watch('interest');
  const mbti = watch('mbti');

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(handleStep2Submit)}>
        <FieldContainer>
          <SelectField value={status || ''} {...register('status')}>
            <option value='' disabled>
              재학 구분
            </option>
            <option value='student'>재학생</option>
            <option value='graduate'>졸업생</option>
            <option value='postgraduate'>대학원생</option>
            <option value='professor'>교수</option>
          </SelectField>
          <FieldErrorMessage hasError={!!errors.status}>
            {errors.status?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <SelectField {...register('department')} defaultValue='computer'>
            <option value='computer'>컴퓨터학부</option>
          </SelectField>
          <FieldErrorMessage hasError={false}>{'\u00A0'}</FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <SelectField value={career || ''} {...register('career')}>
            <option value='' disabled>
              진로
            </option>
            <option value='employment'>취업</option>
            <option value='startup'>창업</option>
            <option value='matriculation'>진학</option>
          </SelectField>
          <FieldErrorMessage hasError={!!errors.career}>
            {errors.career?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <SelectField value={interest || ''} {...register('interest')}>
            <option value='' disabled>
              분야
            </option>
            <option value='frontend'>프론트엔드</option>
            <option value='backend'>백엔드</option>
            <option value='data'>데이터</option>
            <option value='ai'>인공지능</option>
            <option value='security'>보안</option>
          </SelectField>
          <FieldErrorMessage hasError={!!errors.interest}>
            {errors.interest?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <SelectField value={mbti || ''} {...register('mbti')}>
            <option value='' disabled>
              MBTI
            </option>
            {mbtiValues.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>
          <FieldErrorMessage hasError={!!errors.mbti}>
            {errors.mbti?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldLabel>멘토 활동 여부</FieldLabel>
        <MentorDescription>
          쿠넥트에서 멘토로 활동하실 의향이 있다면 &apos;네&apos;를
          선택해주세요.
          <br />
          멘토로 활동해도 멘티로도 참여가 가능합니다.
          <br />
          가입 후 내정보 페이지에서 수정이 가능합니다.
        </MentorDescription>
        <MentorToggleContainer>
          <MentorToggleButton
            type='button'
            isActive={isMentor}
            onClick={() => handleMentorToggle(true)}
          >
            네
          </MentorToggleButton>
          <MentorToggleButton
            type='button'
            isActive={!isMentor}
            onClick={() => handleMentorToggle(false)}
          >
            아니오
          </MentorToggleButton>
        </MentorToggleContainer>

        <ButtonContainer>
          <MainButton type='button' fullWidth={true} onClick={onPrev}>
            이전
          </MainButton>
          <MainButton
            type='submit'
            disabled={isSignUpDisabled}
            fullWidth={true}
          >
            회원가입
          </MainButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};
