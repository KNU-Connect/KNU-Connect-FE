import { TextField, MainButton, LoadingDotsOverlay } from '@/components/common';
import {
  FormContainer,
  Form,
  InputField,
  VerificationButton,
  FieldErrorMessage,
  FieldContainer,
  VerificationInputWrapper,
  VerificationTimer,
} from './signUpStyles';
import { useSignUpStep1 } from '@/hooks/auth';

interface SignUpStep1Props {
  onNext: () => void;
}

export const SignUpStep1 = ({ onNext }: SignUpStep1Props) => {
  const {
    register,
    errors,
    isSending,
    isVerifying,
    isEmailVerifiedFresh,
    emailRemainingSeconds,
    password,
    passwordConfirm,
    isPasswordMatch,
    verificationStatus,
    verificationMessage,
    isNextDisabled,
    handleSendVerificationCode,
    handleVerifyVerificationCode,
    handleStep1Submit,
  } = useSignUpStep1(onNext);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleStep1Submit();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleFormSubmit}>
        <FieldContainer>
          <TextField placeholder='이름' {...register('name')} />
          <FieldErrorMessage hasError={!!errors.name}>
            {errors.name?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <InputField>
            <TextField
              placeholder='이메일 (@knu.ac.kr)'
              {...register('email')}
            />
            <VerificationButton
              type='button'
              fullWidth={false}
              disabled={isSending || isEmailVerifiedFresh}
              onClick={handleSendVerificationCode}
            >
              인증번호 전송
            </VerificationButton>
          </InputField>
          <FieldErrorMessage hasError={!!errors.email}>
            {errors.email?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <InputField>
            <VerificationInputWrapper>
              <TextField
                placeholder='인증번호 입력'
                {...register('verificationCode')}
              />
              {emailRemainingSeconds !== null && (
                <VerificationTimer>
                  {`${String(Math.floor(emailRemainingSeconds / 60)).padStart(
                    1,
                    '0',
                  )}:${String(emailRemainingSeconds % 60).padStart(2, '0')}`}
                </VerificationTimer>
              )}
            </VerificationInputWrapper>
            <VerificationButton
              type='button'
              fullWidth={false}
              disabled={isVerifying || isEmailVerifiedFresh}
              onClick={handleVerifyVerificationCode}
            >
              인증번호 확인
            </VerificationButton>
          </InputField>
          <FieldErrorMessage
            hasError={
              !!errors.verificationCode ||
              verificationStatus === 'error' ||
              verificationStatus === 'success'
            }
            style={
              verificationStatus === 'success'
                ? { color: '#32CD32' }
                : undefined
            }
          >
            {errors.verificationCode?.message ||
              (verificationStatus === 'success'
                ? verificationMessage || '인증번호가 확인되었습니다.'
                : verificationStatus === 'error'
                  ? verificationMessage ||
                    '인증번호가 올바르지 않습니다. 다시 확인해주세요.'
                  : '\u00A0')}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <TextField
            type='password'
            placeholder='비밀번호'
            {...register('password')}
          />
          <FieldErrorMessage hasError={!!errors.password}>
            {errors.password?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <TextField
            type='password'
            placeholder='비밀번호 확인'
            {...register('passwordConfirm')}
          />
          <FieldErrorMessage
            hasError={
              !!errors.passwordConfirm ||
              (!!password && !!passwordConfirm && !isPasswordMatch)
            }
          >
            {errors.passwordConfirm?.message ||
              (!!password && !!passwordConfirm && !isPasswordMatch
                ? '비밀번호가 일치하지 않습니다.'
                : '\u00A0')}
          </FieldErrorMessage>
        </FieldContainer>

        <MainButton type='submit' disabled={isNextDisabled}>
          다음
        </MainButton>
      </Form>

      <LoadingDotsOverlay visible={isSending || isVerifying} />
    </FormContainer>
  );
};
