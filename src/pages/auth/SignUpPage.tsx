import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpPageContainer,
  AppLogo,
  SignUpTitle,
} from '@/components/auth/signUpStyles';
import { SignUpSchema, type SignUpSchemaType } from './signup/signUpSchema';
import { SignUpStep1, SignUpStep2 } from '@/components/auth';

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const formMethods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      department: 'computer',
      isMentor: false,
    },
  });

  const handleSignUpSubmit = (data: SignUpSchemaType) => {
    // TODO: 회원가입 API 호출
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
    </SignUpPageContainer>
  );
}
