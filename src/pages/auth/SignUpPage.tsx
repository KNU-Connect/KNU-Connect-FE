import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  SignUpPageContainer,
  AppLogo,
  SignUpTitle,
} from '@/components/auth/signUpStyles';
import { LoadingDotsOverlay } from '@/components/common';
import { AuthResultModal, SignUpStep1, SignUpStep2 } from '@/components/auth';
import { SignUpSchema, type SignUpSchemaType } from './signup/signUpSchema';
import { useSignup } from '@/api';
import { ROUTES } from '@/routes/paths';
import { SIGNUP_REDIRECT_DELAY } from '@/constants';

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSignupError, setIsSignupError] = useState(false);
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSignupPending } = useSignup();

  const formMethods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      department: 'computer',
      isMentor: false,
      emailVerifiedAt: null,
      emailCodeSentAt: null,
    },
  });

  const handleSignUpSubmit = (data: SignUpSchemaType) => {
    signup(data, {
      onSuccess: () => {
        setIsSignupError(false);
        setShowResultModal(true);
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, SIGNUP_REDIRECT_DELAY);
      },
      onError: () => {
        setIsSignupError(true);
        setShowResultModal(true);
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, SIGNUP_REDIRECT_DELAY);
      },
    });
  };

  const signUpTitle =
    currentStep === 1 ? '회원가입 ( 1 / 2 )' : '회원가입 ( 2 / 2 )';

  return (
    <SignUpPageContainer>
      <AppLogo>KNU connect</AppLogo>
      <SignUpTitle>{signUpTitle}</SignUpTitle>

      <FormProvider {...formMethods}>
        {currentStep === 1 ? (
          <SignUpStep1 onNext={() => setCurrentStep(2)} />
        ) : (
          <SignUpStep2
            onPrev={() => setCurrentStep(1)}
            onSubmitFinal={handleSignUpSubmit}
          />
        )}
      </FormProvider>

      <LoadingDotsOverlay visible={isSignupPending} />

      <AuthResultModal
        isOpen={showResultModal}
        isError={isSignupError}
        message={
          isSignupError
            ? '오류로 인해 회원가입에 실패했습니다.\n잠시 후 로그인 페이지로 이동합니다.'
            : '회원가입이 완료되었습니다.\n잠시 후 로그인 페이지로 이동합니다.'
        }
        onClose={() => navigate(ROUTES.LOGIN)}
      />
    </SignUpPageContainer>
  );
}
