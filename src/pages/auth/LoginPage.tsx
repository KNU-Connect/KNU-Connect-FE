import styled from '@emotion/styled';
import { TextField } from '@/components/common/TextField';
import { MainButton } from '@/components/common/MainButton';
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
`;

export default function LoginPage() {
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: react-hook-form + tanstack query로 로그인 API 연동
  };

  return (
    <LoginPageContainer>
      <BackgroundImage />
      <GradientOverlay />
      <LoginContent>
        <AppLogo>KNU connect</AppLogo>

        <LoginFormContainer>
          <LoginTitle>로그인</LoginTitle>

          <LoginForm onSubmit={handleLoginSubmit}>
            <TextField
              name='email'
              type='email'
              placeholder='이메일'
              autoComplete='email'
              required
            />
            <TextField
              name='password'
              type='password'
              placeholder='비밀번호'
              autoComplete='current-password'
              required
            />

            <MainButton type='submit'>로그인</MainButton>
          </LoginForm>
        </LoginFormContainer>
      </LoginContent>
    </LoginPageContainer>
  );
}
