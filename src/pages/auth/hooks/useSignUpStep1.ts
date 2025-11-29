import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type SignUpSchemaType } from './signUpSchema';
import {
  useSendVerificationCode,
  useVerifyVerificationCode,
} from '../services/email';
import { AUTH_CODE_TTL } from '@/constants';

export const useSignUpStep1 = (onNext: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    setValue,
  } = useFormContext<SignUpSchemaType>();

  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const name = watch('name');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const emailVerifiedAt = watch('emailVerifiedAt');
  const emailCodeSentAt = watch('emailCodeSentAt');

  const isPasswordMatch =
    !!password && !!passwordConfirm && password === passwordConfirm;

  const isEmailVerifiedFresh =
    typeof emailVerifiedAt === 'number' &&
    Date.now() - emailVerifiedAt < AUTH_CODE_TTL;

  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [emailRemainingSeconds, setEmailRemainingSeconds] = useState<
    number | null
  >(null);

  const { mutate: sendVerificationCode, isPending: isSending } =
    useSendVerificationCode();
  const { mutate: verifyVerificationCode, isPending: isVerifying } =
    useVerifyVerificationCode();

  useEffect(() => {
    if (
      typeof emailCodeSentAt !== 'number' ||
      typeof emailVerifiedAt === 'number'
    ) {
      setEmailRemainingSeconds(null);
      return;
    }

    const updateRemaining = () => {
      const elapsed = Date.now() - emailCodeSentAt;
      const diff = AUTH_CODE_TTL - elapsed;

      if (diff <= 0) {
        setEmailRemainingSeconds(0);
        setVerificationStatus('error');
        setVerificationMessage(
          '인증번호가 만료되었습니다. 다시 인증번호를 전송해주세요.',
        );
        setValue('emailCodeSentAt', null, { shouldValidate: false });
        return false;
      }

      setEmailRemainingSeconds(Math.floor(diff / 1000));
      return true;
    };

    const stillValid = updateRemaining();
    if (!stillValid) {
      return;
    }

    const timerId = window.setInterval(() => {
      const ok = updateRemaining();
      if (!ok) {
        window.clearInterval(timerId);
      }
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [emailCodeSentAt, emailVerifiedAt, setValue]);

  const handleSendVerificationCode = () => {
    if (!email) {
      toast.error('이메일을 먼저 입력해주세요.');
      return;
    }
    setVerificationStatus('idle');
    setVerificationMessage('');
    setValue('emailVerifiedAt', null, { shouldValidate: false });

    sendVerificationCode(
      { email },
      {
        onSuccess: (response) => {
          toast.success(
            response.message ||
              '인증번호가 전송되었습니다. 메일함을 확인해주세요.',
          );
          setValue('emailCodeSentAt', Date.now(), { shouldValidate: false });
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message ||
              '인증번호 전송에 실패했습니다. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const handleVerifyVerificationCode = () => {
    if (!email || !verificationCode) {
      setVerificationStatus('error');
      setVerificationMessage('이메일과 인증번호를 입력해주세요.');
      return;
    }

    verifyVerificationCode(
      { email, verificationCode },
      {
        onSuccess: (response) => {
          setVerificationStatus('success');
          setVerificationMessage(
            response.message || '인증번호가 확인되었습니다.',
          );
          setValue('emailVerifiedAt', Date.now(), { shouldValidate: false });
        },
        onError: (error: any) => {
          setVerificationStatus('error');
          setVerificationMessage(
            error.response?.data?.message ||
              '인증번호 확인에 실패했습니다. 다시 시도해주세요.',
          );
        },
      },
    );
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

  const isNextDisabled =
    isSubmitting ||
    !name ||
    !email ||
    !verificationCode ||
    !password ||
    !passwordConfirm ||
    !isEmailVerifiedFresh ||
    !isPasswordMatch;

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSending,
    isVerifying,
    password,
    passwordConfirm,
    isPasswordMatch,
    isEmailVerifiedFresh,
    verificationStatus,
    verificationMessage,
    emailRemainingSeconds,
    isNextDisabled,
    handleSendVerificationCode,
    handleVerifyVerificationCode,
    handleStep1Submit,
  };
};
