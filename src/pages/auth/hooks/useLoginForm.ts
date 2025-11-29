import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLogin } from '../services/login';
import { ROUTES } from '@/routes/paths';
import { TEST_CREDENTIALS } from '@/config/authConfig';
import { LOGIN_REDIRECT_DELAY, MODAL_AUTO_CLOSE_DELAY } from '@/constants';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [showResultModal, setShowResultModal] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const runLogin = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        setIsLoginError(false);
        setShowResultModal(true);
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, LOGIN_REDIRECT_DELAY);
      },
      onError: () => {
        setIsLoginError(true);
        setShowResultModal(true);
        setTimeout(() => {
          setShowResultModal(false);
        }, MODAL_AUTO_CLOSE_DELAY);
      },
    });
  };

  const onSubmit = (values: LoginFormValues) => {
    runLogin(values);
  };

  const handleTestLogin = () => {
    if (!TEST_CREDENTIALS.email || !TEST_CREDENTIALS.password) {
      console.warn('테스트 계정 환경변수.env를 설정해주세요.');
      return;
    }

    runLogin({
      email: TEST_CREDENTIALS.email,
      password: TEST_CREDENTIALS.password,
    });
  };

  const handleModalClose = () => {
    setShowResultModal(false);
    if (!isLoginError) {
      navigate(ROUTES.HOME);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    showResultModal,
    isLoginError,
    onSubmit,
    handleTestLogin,
    handleModalClose,
  };
};
