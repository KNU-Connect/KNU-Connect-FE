import { TextField, MainButton } from '@/components/common';
import {
  FormContainer,
  Form,
  InputField,
  VerificationButton,
  FieldErrorMessage,
  FieldContainer,
} from './signUpStyles';
import { useSignUpStep1 } from '@/hooks/auth';

interface SignUpStep1Props {
  onNext: () => void;
}

export const SignUpStep1 = ({ onNext }: SignUpStep1Props) => {
  const {
    register,
    errors,
    isSubmitting,
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
            <TextField
              placeholder='인증번호 입력'
              {...register('verificationCode')}
            />
            <VerificationButton
              type='button'
              fullWidth={false}
              onClick={handleVerifyVerificationCode}
            >
              인증번호 확인
            </VerificationButton>
          </InputField>
          <FieldErrorMessage hasError={!!errors.verificationCode}>
            {errors.verificationCode?.message || '\u00A0'}
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
          <FieldErrorMessage hasError={!!errors.passwordConfirm}>
            {errors.passwordConfirm?.message || '\u00A0'}
          </FieldErrorMessage>
        </FieldContainer>

        <MainButton type='submit' disabled={isSubmitting}>
          다음
        </MainButton>
      </Form>
    </FormContainer>
  );
};
