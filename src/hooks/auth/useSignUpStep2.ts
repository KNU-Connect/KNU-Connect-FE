import { useFormContext } from 'react-hook-form';
import { type SignUpSchemaType } from '@/pages/auth/signup/signUpSchema';

export const useSignUpStep2 = (
  onPrev: () => void,
  onSubmitFinal: (data: SignUpSchemaType) => void,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useFormContext<SignUpSchemaType>();

  const isMentor = watch('isMentor');

  const handleStep2Submit = (data: SignUpSchemaType) => {
    onSubmitFinal(data);
  };

  const handleMentorToggle = (value: boolean) => {
    setValue('isMentor', value, { shouldValidate: true });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isMentor,
    handleStep2Submit,
    handleMentorToggle,
    watch,
    onPrev,
  };
};
