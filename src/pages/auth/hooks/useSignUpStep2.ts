import { useFormContext } from 'react-hook-form';
import { type SignUpSchemaType } from './signUpSchema';

export const useSignUpStep2 = (
  onPrev: () => void,
  onSubmitFinal: (data: SignUpSchemaType) => void,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<SignUpSchemaType>();

  const isMentor = watch('isMentor');
  const status = watch('status');
  const career = watch('career');
  const interest = watch('interest');
  const mbti = watch('mbti');

  const handleStep2Submit = (data: SignUpSchemaType) => {
    onSubmitFinal(data);
  };

  const handleMentorToggle = (value: boolean) => {
    setValue('isMentor', value, { shouldValidate: true });
  };

  const isSignUpDisabled = !status || !career || !interest || !mbti;

  return {
    register,
    handleSubmit,
    errors,
    isMentor,
    handleStep2Submit,
    handleMentorToggle,
    watch,
    isSignUpDisabled,
    onPrev,
  };
};
