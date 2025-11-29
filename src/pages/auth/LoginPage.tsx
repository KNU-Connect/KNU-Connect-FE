import styled from '@emotion/styled';
import { TextField, MainButton, LoadingDotsOverlay } from '@/components/common';
import { ROUTES } from '@/routes/paths';
import { AuthResultModal } from './components';
import { useLoginForm } from './hooks';
import bgImage from '@/assets/knu-building.jpg';

const LoginPageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.35) 40%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

const LoginContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const AppLogo = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Pacifico', 'cursive';
  font-size: 1.8rem;
`;

const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: ${({ theme }) => theme.spacing[4]} auto 0;
`;

const LoginTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.white};
  ${({ theme }) => theme.typography.subtitle1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const LoginButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    showResultModal,
    isLoginError,
    onSubmit,
    handleTestLogin,
    handleModalClose,
  } = useLoginForm();

  const handleSignUpClick = () => {
    window.location.href = ROUTES.SIGNUP;
  };

  return (
    <LoginPageContainer>
      <BackgroundImage />
      <GradientOverlay />
      <LoginContent>
        <AppLogo>KNU connect</AppLogo>

        <LoginFormContainer>
          <LoginTitle>로그인</LoginTitle>

          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type='email'
              placeholder='이메일'
              autoComplete='email'
              {...register('email')}
            />
            {errors.email && (
              <p
                style={{
                  color: '#DA2127',
                  fontSize: '0.875rem',
                  marginTop: '4px',
                }}
              >
                {errors.email.message}
              </p>
            )}
            <TextField
              type='password'
              placeholder='비밀번호'
              autoComplete='current-password'
              {...register('password')}
            />
            {errors.password && (
              <p
                style={{
                  color: '#DA2127',
                  fontSize: '0.875rem',
                  marginTop: '4px',
                }}
              >
                {errors.password.message}
              </p>
            )}

            <MainButton type='submit' disabled={isPending}>
              {isPending ? '로그인 중...' : '로그인'}
            </MainButton>
          </LoginForm>

          <LoginButtonGroup>
            <MainButton type='button' onClick={handleSignUpClick}>
              회원가입
            </MainButton>
            <MainButton type='button' onClick={handleTestLogin}>
              테스트 계정으로 로그인
            </MainButton>
          </LoginButtonGroup>
        </LoginFormContainer>
      </LoginContent>

      <LoadingDotsOverlay visible={isPending} />

      <AuthResultModal
        isOpen={showResultModal}
        isError={isLoginError}
        message={
          isLoginError
            ? '오류로 인해 로그인이 실패했습니다.\n이메일 또는 비밀번호를 확인해주세요.'
            : '로그인이 완료되었습니다.\n잠시 후 메인 페이지로 이동합니다.'
        }
        onClose={handleModalClose}
      />
    </LoginPageContainer>
  );
}
