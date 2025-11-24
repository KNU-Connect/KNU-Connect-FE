import { useFormContext } from 'react-hook-form';
import { type SignUpSchemaType } from '@/pages/auth/signup/signUpSchema';

export const useSignUpStep1 = (onNext: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useFormContext<SignUpSchemaType>();

  const handleSendVerificationCode = () => {
    // TODO: 인증번호 전송 API 연동
    alert('인증번호 전송 API 연동 예정');
  };

  const handleVerifyVerificationCode = () => {
    // TODO: 인증번호 확인 API 연동
    alert('인증번호 확인 API 연동 예정');
  };

  const handleStep1Submit = async () => {
    const isStep1Valid = await trigger([
      'name',
      'email',
      'verificationCode',
      'password',
      'passwordConfirm',
    ]);

    if (isStep1Valid) {
      onNext();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleSendVerificationCode,
    handleVerifyVerificationCode,
    handleStep1Submit,
  };
};
