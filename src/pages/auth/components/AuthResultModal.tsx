import {
  SignupResultOverlay,
  SignupResultContainer,
  SignupResultCloseButton,
  SignupResultMessage,
} from './signUpStyles';

interface AuthResultModalProps {
  isOpen: boolean;
  isError?: boolean;
  message: string;
  onClose: () => void;
}

export const AuthResultModal = ({
  isOpen,
  isError = false,
  message,
  onClose,
}: AuthResultModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <SignupResultOverlay>
      <SignupResultContainer>
        <SignupResultCloseButton
          type='button'
          aria-label='닫기'
          onClick={onClose}
        >
          ×
        </SignupResultCloseButton>
        <SignupResultMessage isError={isError}>{message}</SignupResultMessage>
      </SignupResultContainer>
    </SignupResultOverlay>
  );
};
